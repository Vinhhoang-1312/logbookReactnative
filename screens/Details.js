import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { DatabaseConnection } from "../database/connectdatabase";

const db = DatabaseConnection.getConnection();
const image = {
  uri: "https://img.nh-hotels.net/anantara_plaza_nice_hotel-017-rooms.jpg?output-quality=80&resize=1600:*&background-color=white",
};
const Details = ({ route }) => {
  const { Data } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.ShowData}>
        <Text style={styles.Text}>ID Number :</Text>
        <Text style={styles.Data}>{Data.Id}</Text>

        <Text style={styles.Text}>Property type :</Text>
        <Text style={styles.Data}>{Data.propertytype}</Text>

        <Text style={styles.Text}>Bedrooms :</Text>
        <Text style={styles.Data}>{Data.bedrooms}</Text>

        <Text style={styles.Text}>Datetime :</Text>
        <Text style={styles.Data}>{Data.dateandtime}</Text>

        <Text style={styles.Text}>Monthly rent price :</Text>
        <Text style={styles.Data}>{Data.price}</Text>

        <Text style={styles.Text}>Furniture :</Text>
        <Text style={styles.Data}>{Data.furniture}</Text>

        <Text style={styles.Text}>Notes :</Text>
        <Text style={styles.Data}>{Data.notes}</Text>

        <Text style={styles.Text}>Name of the reporter :</Text>
        <Text style={styles.Data}>{Data.reporter}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 25,
  },
  ShowData: {
    padding: 25,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "gainsboro",
  },
  Text: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  Data: {
    marginBottom: 10,
    color: "black",
    fontSize: 18,
  },
});

export default Details;
