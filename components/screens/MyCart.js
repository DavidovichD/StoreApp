import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Colors } from "../database/Database";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const MyCart = () => {
  const navigation = useNavigation();
  const [savedCars, setSavedCars] = useState([]);
  const [total, setTotal] = useState(null);
  const [savedCarsStr, setSavedCarsStr] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetch("https://proj.ruppin.ac.il/cgroup46/test2/tar1/api/SavedCars", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        // console.log("res=", JSON.stringify(res))
        return res.json();
      })
      .then((result) => {
          // console.log("fetch GET: ", result);
          let tmpTotal = 0;
          for (let i = 0; i < result.length; i++) {
            tmpTotal += result[i].price;
            handleSavedCarsArr(result[i]);
            // console.log(result[i]);
          }
          setTotal(tmpTotal);
          const carComponents = result.map((car) => (
            <TouchableOpacity
              key={car.id}
              onPress={() => navigation.navigate("Product", { carID: car.id })}
              style={{
                width: "100%",
                height: 100,
                marginVertical: 6,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "30%",
                  height: 100,
                  padding: 14,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: Colors.backgroundLight,
                  borderRadius: 10,
                  marginRight: 22,
                }}
              >
                <Image
                  source={{ uri: car.mainImage }}
                  style={{
                    width: "130%",
                    height: "100%",
                    resizeMode: "contain",
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  height: "100%",
                  justifyContent: "space-around",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      maxWidth: "100%",
                      color: Colors.black,
                      fontWeight: "600",
                      letterSpacing: 1,
                    }}
                  >
                    {car.brand + " " + car.model}
                  </Text>
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "400",
                        maxWidth: "85%",
                        marginRight: 4,
                      }}
                    >
                      ${car.price}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        borderRadius: 100,
                        marginRight: 20,
                        padding: 4,
                        borderWidth: 1,
                        borderColor: Colors.backgroundMedium,
                        opacity: 0.5,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="minus"
                        style={{
                          fontSize: 16,
                          color: Colors.backgroundDark,
                        }}
                      />
                    </View>
                    <Text>1</Text>
                    <View
                      style={{
                        borderRadius: 100,
                        marginLeft: 20,
                        padding: 4,
                        borderWidth: 1,
                        borderColor: Colors.backgroundMedium,
                        opacity: 0.5,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="plus"
                        style={{
                          fontSize: 16,
                          color: Colors.backgroundDark,
                        }}
                      />
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => removeItemFromCart(car.id)}>
                    <MaterialCommunityIcons
                      name="delete-outline"
                      style={{
                        fontSize: 16,
                        color: Colors.backgroundDark,
                        backgroundColor: Colors.backgroundLight,
                        padding: 8,
                        borderRadius: 100,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ));
          setSavedCarsStr(carComponents);
        },
        (error) => {
          console.log("err GET: ", error);
        }
      );
    }, [savedCars])
  );

  const handleSavedCarsArr = (car) => {
    setSavedCars([...savedCars, car]);
  };

  // delete item from cart function
  const removeItemFromCart = (id) => {

    fetch(`https://proj.ruppin.ac.il/cgroup46/test2/tar1/api/SavedCars/${id}`, {
      method: "DELETE",
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
          console.log("fetch DELETE: ", result);
          ToastAndroid.show("Item Was Removed from Cart", ToastAndroid.SHORT);
          let updatedCartItems = savedCars.filter(
            (savedCars) => savedCars.id !== result
          );
          setSavedCars(updatedCartItems);
        },
        (error) => {
          console.log("err DELETE: ", error);
        }
      );
  };

  // checkout function
  const checkOut = () => {
      fetch(
        `https://proj.ruppin.ac.il/cgroup46/test2/tar1/api/SavedCars`,
        {
          method: "DELETE",
          headers: new Headers({
            "Content-type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          }),
        }
      )
        .then((res) => {
          console.log("res=", JSON.stringify(res));
          return res.text();
        })
        .then(
          (result) => {
            console.log("fetch DELETE: ", result);
          },
          (error) => {
            console.log("err DELETE: ", error);
          }
        );
    ToastAndroid.show("Thank you! The cars will be Delivered SOON!", ToastAndroid.SHORT);
    navigation.navigate("Home");
  };

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
            Order Details
          </Text>
          <View></View>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: Colors.black,
            fontWeight: "500",
            letterSpacing: 1,
            paddingTop: 20,
            paddingLeft: 16,
            marginBottom: 16,
          }}
        >
          My Cart
        </Text>
        <View style={{ paddingHorizontal: 16 }}>
          {savedCarsStr}
        </View>

        {/* Delivery */}
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
              Delivery Location
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                  style={{
                  flexDirection: "row",
                  width: "80%",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    color: Colors.blue,
                    backgroundColor: Colors.backgroundLight,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 12,
                    borderRadius: 10,
                    marginRight: 18,
                  }}
                >
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    style={{
                      fontSize: 18,
                      color: Colors.blue,
                    }}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.black,
                      fontWeight: "500",
                    }}
                  >
                    Bavarian Motors
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: Colors.black,
                      fontWeight: "400",
                      lineHeight: 20,
                      opacity: 0.5,
                    }}
                  >
                     Hahoshlim St. 4, Herzliya, IL
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                style={{
                  fontSize: 22,
                  color: Colors.black,
                }}
              />
            </View>
          </View>

          {/* Payment */}
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
              Payment Method
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "80%",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    color: Colors.blue,
                    backgroundColor: Colors.backgroundLight,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 12,
                    borderRadius: 10,
                    marginRight: 18,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "900",
                      color: Colors.blue,
                      letterSpacing: 1,
                    }}
                  >
                    VISA
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.black,
                      fontWeight: "500",
                    }}
                  >
                    VISA card
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: Colors.black,
                      fontWeight: "400",
                      lineHeight: 20,
                      opacity: 0.5,
                    }}
                  >
                    ****-****-****-0123
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                style={{
                  fontSize: 22,
                  color: Colors.black,
                }}
              />
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 40,
              marginBottom: 80,
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
              Order Info
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  maxWidth: "80%",
                  color: Colors.black,
                  opacity: 0.5,
                }}
              >
                Subtotal
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  maxWidth: "80%",
                  color: Colors.black,
                  opacity: 0.8,
                }}
              >
                ${total}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 22,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  maxWidth: "80%",
                  color: Colors.black,
                  opacity: 0.5,
                }}
              >
                Shipping Tax (10%)
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  maxWidth: "80%",
                  color: Colors.black,
                  opacity: 0.8,
                }}
              >
                ${total / 10}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  maxWidth: "80%",
                  color: Colors.black,
                  opacity: 0.5,
                }}
              >
                Total
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                  color: Colors.black,
                }}
              >
                ${total + total / 10}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Checkout */}
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
          onPress={() => (total != 0 ? checkOut() : null)}
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
            Checkout (${total + total / 10})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyCart;
