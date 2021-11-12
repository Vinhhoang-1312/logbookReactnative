import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CustomButton = (properties) => {
  return (
    <TouchableOpacity
      onPress={properties.handlePress}
      style={styles.buttonpress}
    >
      <Text style={styles.text}>{properties.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonpress: {
    marginTop: 20,
    marginBottom: 50,
    marginLeft: 90,
    width: 90,
    height: 40,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    backgroundColor: "dodgerblue",
  },
  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});

export default CustomButton;
