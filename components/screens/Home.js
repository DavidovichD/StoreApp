import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Colors } from "../database/Database";
import { StatusBar } from "expo-status-bar";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import {I18nManager} from "react-native";

const Home = () => {

  I18nManager.allowRTL(false);
  const navigation = useNavigation();
  const [categoriesStr, setCategoriesStr] = useState();
  const carsByBrand = {};

  useEffect(() => {
    fetch("https://proj.ruppin.ac.il/cgroup46/test2/tar1/api/Cars", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("res=", JSON.stringify(res))
        return res.json();
      })
      .then(
        (result) => {
          console.log("result: ", result);
          for (let car of result) {
            if (!carsByBrand[car.brand]) {
              carsByBrand[car.brand] = [];
            }
            carsByBrand[car.brand].push(car);
          }
          console.log("brands: ",carsByBrand);
          let categoriesStr = [];
          Object.keys(carsByBrand).forEach((brand, i) => {
            const brandCars = carsByBrand[brand];
            const carCount = brandCars.reduce((count, car) => count + 1, 0);
            const brandStr = (
              <View style={{ padding: 16 }} key={i}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: Colors.black,
                        fontWeight: "500",
                        letterSpacing: 1,
                      }}
                    >
                      {brand} {/*Car brand name*/}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Colors.black,
                        fontWeight: "400",
                        opacity: 0.5,
                        marginLeft: 10,
                      }}
                    >
                      {carCount} {/*how many cars exist in that brand*/}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.blue,
                      fontWeight: "400",
                    }}
                  >
                    See All
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                  }}
                >
                  {brandCars.map((car, j) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Product", { carID: car.id })
                      }
                      style={{ width: "48%", marginVertical: 14 }}
                      key={j}
                    >
                      <View
                        style={{
                          width: "100%",
                          height: 100,
                          borderRadius: 10,
                          backgroundColor: Colors.backgroundLight,
                          position: "relative",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: 8,
                        }}
                      >
                        <Image
                          source={{ uri: car.mainImage }}
                          style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "contain",
                          }}
                        />
                      </View>
                      <Text
                        key={j}
                        style={{
                          fontSize: 12,
                          color: Colors.black,
                          fontWeight: "600",
                          marginBottom: 2,
                        }}
                      >
                        {car.brand + " " + car.model}
                      </Text>
                      <Text>${car.price.toLocaleString("en-US")}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            );

            categoriesStr.push(brandStr);
          });
          setCategoriesStr(categoriesStr);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  }, [navigation]);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: Colors.white,
      }}
    >
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 16,
            paddingTop: 42,
          }}
        >
          <TouchableOpacity onPress={()=> navigation.navigate("AddCar")}>
            <Ionicons
              name="add-circle-sharp"
              style={{
                fontSize: 18,
                color: Colors.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                backgroundColor: Colors.backgroundLight,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <MaterialCommunityIcons
              name="cart"
              style={{
                fontSize: 18,
                color: Colors.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: Colors.backgroundLight,
              }}
            />
          </TouchableOpacity>
        </View>
        <View //HEADER
          style={{
            marginBottom: 10,
            padding: 16,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              color: Colors.black,
              fontWeight: "500",
              letterSpacing: 1,
              marginBottom: 10,
            }}
          >
            Sports Cars &amp; Automotive
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Colors.black,
              fontWeight: "400",
              letterSpacing: 1,
              lineHeight: 24,
            }}
          >
            Online car store
            {"\n"}Offering luxurious automotives
          </Text>
        </View>

        {/*Render*/}
        {categoriesStr}
      </ScrollView>
    </View>
  );
};

export default Home;
