import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../database/Database";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function AddCar() {
  const navigation = useNavigation();
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [country, setCountry] = useState('');
  const [color, setColor] = useState('');
  const [specs, setSpecs] = useState('');
  const [price, setPrice] = useState('');
  const [image1, setimage1] = useState('');
  const [image2, setimage2] = useState('');
  const [image3, setimage3] = useState('');

  const btnAdd = () => {

    const newCar = {
      Brand: brand,
      Model: model,
      Country: country,
      Color: color,
      Specs: specs,
      Price: price,
      MainImage: image1,
      SecondImage: image2,
      ThirdImage: image3,
    };

    console.log("new car: ", newCar);

    fetch("https://proj.ruppin.ac.il/cgroup46/test2/tar1/api/Cars", {
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
            "New Car Was Added",
            ToastAndroid.SHORT
          );
          navigation.navigate("Home");
        },
        (error) => {
          console.log("err POST: ", error);
          ToastAndroid.show(
            "Error",
            ToastAndroid.SHORT
          );
          navigation.navigate("Home");
        }
      );
  }

  return (
    <View
      style={{
        paddingTop: 26,
        width: "100%",
        height: "100%",
        backgroundColor: Colors.white,
      }}
    >
      <ScrollView>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            paddingTop: 16,
            paddingLeft: 16,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              style={{
                fontSize: 18,
                color: Colors.backgroundDark,
                padding: 12,
                backgroundColor: Colors.backgroundLight,
                borderRadius: 12,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              color: Colors.black,
              fontWeight: "600",
              marginRight: 55,
            }}
          >
            Add a Car
          </Text>
          <View></View>
        </View>
        <View>
          <View
            style={{
              paddingHorizontal: 16,
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: Colors.black,
                fontWeight: "500",
                letterSpacing: 1,
                marginBottom: 20,
              }}
            >
              Insert car specs down below
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={setBrand}
              placeholder="Brand"
              keyboardType="text"
            />
            <TextInput
              style={styles.input}
              onChangeText={setModel}
              placeholder="Model"
              keyboardType="text"
            />
            <TextInput
              style={styles.input}
              onChangeText={setCountry}
              placeholder="Country"
              keyboardType="text"
            />
            <TextInput
              style={styles.input}
              onChangeText={setColor}
              placeholder="Color"
              keyboardType="text"
            />
            <TextInput
              style={styles.input}
              onChangeText={setSpecs}
              placeholder="Specs"
              keyboardType="text"
            />
            <TextInput
              style={styles.input}
              onChangeText={setPrice}
              placeholder="Price"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              onChangeText={setimage1}
              placeholder="1st Image URL"
              keyboardType="text"
            />
            <TextInput
              style={styles.input}
              onChangeText={setimage2}
              placeholder="2nd Image URL"
              keyboardType="text"
            />
            <TextInput
              style={styles.input}
              onChangeText={setimage3}
              placeholder="3rd Image URL"
              keyboardType="text"
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          height: "8%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={btnAdd}
          style={{
            width: "86%",
            height: "90%",
            backgroundColor: Colors.blue,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              letterSpacing: 1,
              color: Colors.white,
              textTransform: "uppercase",
            }}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddCar

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:10
  },
});