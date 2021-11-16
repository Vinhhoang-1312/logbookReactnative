import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Result from "./screens/Result";
import Home from "./screens/Home";
import Notification from "./screens/Notification";
import EditDelete from "./screens/EditDelete";
import Search from "./screens/Search";
import Details from "./screens/Details";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Result" component={Result} />
        <Drawer.Screen name="EditDelete" component={EditDelete} />
        <Drawer.Screen name="Notification" component={Notification} />
        <Drawer.Screen name="Search" component={Search} />
        <Drawer.Screen name="Details" component={Details} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
