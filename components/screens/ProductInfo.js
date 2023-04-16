import { View, Text, ScrollView, TouchableOpacity, FlatList, Image, Dimensions, Animated, ToastAndroid } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../database/Database';
import { StatusBar } from 'expo-status-bar';
import Entypo from "react-native-vector-icons/Entypo"

const ProductInfo = ({route}) => {

  const navigation = useNavigation();
  const {carID} = route.params;
  const width = Dimensions.get("window").width;
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX,width);

  const [car, setCar] = useState({});
  const [images, setImages] = useState([])

  useEffect(() => {
    fetch("https://proj.ruppin.ac.il/cgroup46/test2/tar1/api/Cars/"+carID, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("res=", JSON.stringify(res))
        return res.json();
      })
      .then((result) => {
          console.log("fetch GET: ", result);
          setCar(result)
          setImages([
            {uri:result.mainImage},
            {uri:result.secondImage},
            {uri:result.thirdImage},
          ])
        },
        (error) => {
          console.log("err GET: ", error);
        }
      );
  }, [navigation]);

  //product horizontal images scroll
  const renderProduct = ({item,i}) => {
    return(
      <View style={{
        width:width,
        height:240,
        alignItems:"center",
        justifyContent:"center"
      }}>
        <Image source={item} style={{
          width:"100%",
          height:"100%",
          resizeMode:"contain"
        }} />
      </View>
    )
  }

  //add car to cart
  const addToCart = () => {

    const newCar = {
      Id: car.id,
      Brand: car.brand,
      Model: car.model,
      Country: car.country,
      Color: car.color,
      Specs: car.specs,
      Price: car.price,
      MainImage: car.mainImage,
      SecondImage: car.secondImage,
      ThirdImage: car.thirdImage,
    };

    console.log("new car: ", newCar);

    fetch("https://proj.ruppin.ac.il/cgroup46/test2/tar1/api/SavedCars", {
      method: "POST",
      body: JSON.stringify(newCar),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("res=", JSON.stringify(res));
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST: ", result);
          ToastAndroid.show(
            "Item Added Succefully To Cart",
            ToastAndroid.SHORT
          );
          navigation.navigate("Home");
        },
        (error) => {
          console.log("err POST: ", error);
          ToastAndroid.show(
            "Item Already In Cart",
            ToastAndroid.SHORT
          );
          navigation.navigate("Home");
        }
      );
    };
  
  return (
    <View style={{
      paddingTop:26,
      width:"100%",
      height:"100%",
      backgroundColor: Colors.white,
      position:"relative"
    }}>
      <StatusBar backgroundColor={Colors.backgroundLight} barStyle="dark-content" />
      <ScrollView>
        <View style={{
          width:"100%",
          backgroundColor:Colors.backgroundLight,
          borderBottomRightRadius:20,
          borderBottomLeftRadius:20,
          position:"relative",
          justifyContent:"center",
          alignItems:"center",
          marginBottom:4
        }}>
          <View style={{
            width:"100%",
            flexDirection:"row",
            justifyContent:"space-between",
            paddingTop:16,
            paddingLeft:16
          }}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
              <Entypo name="chevron-left" style={{
                fontSize:18,
                color:Colors.backgroundDark,
                padding:12,
                backgroundColor:Colors.white,
                borderRadius:10
              }} />
            </TouchableOpacity>
          </View>
          <FlatList 
            data={images} 
            horizontal 
            renderItem={renderProduct}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapToInterval={width}
            bounces={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x:scrollX}}}],
              {useNativeDriver:false}
            )}
          />
          <View style={{
            width:"100%",
            flexDirection:"row",
            justifyContent:"center",
            alignItems:"center",
            marginBottom:16,
            marginTop:32,
          }}>
            {images ? images.map((data,index) =>{
              let opacity = position.interpolate({
                inputRange: [index -1, index, index + 1],
                outputRange: [0.2,1,0.2],
                extrapolate:"clamp"
              })
              return(
                <Animated.View key={index} style={{
                  width:"16%",
                  height:2.4,
                  backgroundColor:Colors.black,
                  opacity,
                  marginHorizontal:4,
                  borderRadius:100
                }}>
                </Animated.View>
              )
            }) : null}
          </View>
        </View>
        <View style={{
          paddingHorizontal:16,
          marginTop:6
        }}>
          <View style={{
            flexDirection:"row",
            alignItems:"center",
            marginVertical:14
          }}>
            <Entypo name="shopping-cart" style={{
              fontSize:18,
              color:Colors.blue,
              marginRight:6
            }} />
            <Text style={{
              fontSize:12,
              color:Colors.black
            }}>
              Shopping
            </Text>
          </View>
          <View style={{
            flexDirection:"row",
            marginVertical:4
          }}>
            <Text style={{
              fontSize:24,
              fontWeight:"600",
              letterSpacing:0.5,
              marginVertical:4,
              color:Colors.black,
              maxWidth:"100%",
            }}>
              {car.brand + " " + car.model}
            </Text>
          </View>
          <Text style={{
            fontSize:12,
            color:Colors.black,
            fontWeight:"400",
            letterSpacing:1,
            opacity:0.5,
            lineHeight:20,
            maxHeight:100,
            marginBottom:15
          }}>
            {car.specs}
          </Text>
          <Text style={{
            fontSize:12,
            color:Colors.black,
            fontWeight:"400",
            letterSpacing:1,
            opacity:0.5,
            marginBottom:15
          }}>
            Made in {car.country}
          </Text>
          <Text style={{
            fontSize:12,
            color:Colors.black,
            fontWeight:"400",
            letterSpacing:1,
            opacity:0.5,
            marginBottom:15
          }}>
            Color: {car.color}
          </Text>
          <View style={{}}>
            <Text style={{
              fontSize:18,
              fontWeight:"500",
              color:Colors.black,
              marginBottom:4
            }}>
              Price: ${car.price}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Add to cart button */}
      <View style={{
        position:"absolute",
        bottom:10,
        height:"8%",
        width:"100%",
        justifyContent:"center",
        alignItems:"center"
      }}>
        <TouchableOpacity onPress={() => addToCart(car.id)} style={{
          width:"86%",
          height:"90%",
          backgroundColor:Colors.blue,
          borderRadius:20,
          justifyContent:"center",
          alignItems:"center"
        }}>
          <Text style={{
            fontSize:14,
            fontWeight:"500",
            letterSpacing:1,
            color:Colors.white,
            textTransform:"uppercase"
          }}>
            Add to cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProductInfo