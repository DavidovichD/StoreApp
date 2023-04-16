import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/screens/Home";
import ProductInfo from "./components/screens/ProductInfo";
import MyCart from "./components/screens/MyCart";
import AddCar from "./components/screens/AddCar";

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Product" component={ProductInfo} />
        <Stack.Screen name="Cart" component={MyCart} />
        <Stack.Screen name="AddCar" component={AddCar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
