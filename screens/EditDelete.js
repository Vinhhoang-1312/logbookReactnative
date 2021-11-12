import "react-native-gesture-handler";
import {
  Text,
  View,
  Alert,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";

import React, { useState, useEffect, ImageBackground } from "react";
import { DatabaseConnection } from "../database/connectdatabase";
const db = DatabaseConnection.getConnection();

function EditDelete({ route, navigation }) {
  const [Id, setId] = useState("");
  const [propertytype, setPropertytype] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [dateandtime, setDateandtime] = useState("");
  const [price, setPrice] = useState("");
  const [furniture, setFurniture] = useState("");
  const [notes, setNotes] = useState("");
  const [reporter, setReporter] = useState("");

  useEffect(() => {
    setId(route.params.Id);
    setPropertytype(route.params.propertytype);
    setBedrooms(route.params.bedrooms);
    setDateandtime(route.params.dateandtime);
    setPrice(route.params.price);
    setFurniture(route.params.furniture);
    setNotes(route.params.notes);
    setReporter(route.params.reporter);
  }, []);
  const image = {
    uri: "https://img.nh-hotels.net/anantara_plaza_nice_hotel-017-rooms.jpg?output-quality=80&resize=1600:*&background-color=white",
  };
  const editData = () => {
    if (
      propertytype.length === 0 ||
      bedrooms.length === 0 ||
      dateandtime.length === 0 ||
      price.length === 0 ||
      furniture.length === 0 ||
      notes.length === 0 ||
      reporter.length === 0
    ) {
      Alert.alert("Some of your information is missing !!! Please check again");
    } else {
      try {
        db.transaction((tx) => {
          tx.executeSql(
            "UPDATE Databaselogbookrentalz SET propertytype=? ,bedrooms=? , dateandtime=? , price=? , furniture=? , notes=? , reporter=?   WHERE Id =?",
            [
              propertytype,
              bedrooms,
              dateandtime,
              price,
              furniture,
              notes,
              reporter,
              Id,
            ],
            (tx, results) => {
              console.log("Results", results.rowsAffected);
            }
          );
        });
        navigation.navigate("Result");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deletedata = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM Databaselogbookrentalz WHERE Id = ?",
          [Id],
          (tx, result) => {
            alert("Deleted success!!!");
          }
        );
      });
    } catch (error) {}
    navigation.navigate("Result");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
      >
        <View>
          <Text style={styles.head}>Change or delete data </Text>
          <Text style={styles.text}>Property type:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(value) => setPropertytype(value)}
            value={propertytype}
          />

          <Text style={styles.text}>Bedrooms :</Text>
          <TextInput
            style={styles.textInput}
            keyboardType={"numeric"}
            onChangeText={(value) => setBedrooms(value)}
            value={bedrooms}
          />

          <Text style={styles.text}>Data and Time :</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(value) => setDateandtime(value)}
            value={dateandtime}
          />

          <Text style={styles.text}>Monthly rent price :</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(value) => setPrice(value)}
            keyboardType={"numeric"}
            value={price.toString()}
          />

          <Text style={styles.text}>Furniture types :</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(value) => setFurniture(value)}
            value={furniture}
          />

          <Text style={styles.text}>Notes :</Text>
          <TextInput
            style={{
              borderWidth: 1,
              height: 80,
              width: 220,
              borderRadius: 5,
              textAlign: "center",
              fontSize: 17,
              marginBottom: 10,
              marginTop: 10,
              borderColor: "royalblue",
            }}
            onChangeText={(value) => setNotes(value)}
            value={notes}
          />

          <Text style={styles.text}>Name of the reporter :</Text>
          <TextInput
            style={[styles.textInput, { marginBottom: 20 }]}
            onChangeText={(value) => setReporter(value)}
            value={reporter}
          />

          <TouchableOpacity style={styles.touchstyle} onPress={editData}>
            <Text style={styles.touchstyleText}> Edit Data </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.touchstyle,
              { marginTop: 20, marginBottom: 40, backgroundColor: "red" },
            ]}
            onPress={deletedata}
          >
            <Text style={styles.touchstyleText}> Delete Data </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  head: {
    marginTop: 5,
    marginBottom: 20,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
  scrollView: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
  text: {
    marginTop: 20,
    textAlign: "left",
    color: "black",
    fontSize: 15,
  },
  touchstyle: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "dodgerblue",
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },

  touchstyleText: {
    color: "white",
    fontSize: 23,
    textAlign: "center",
    padding: 8,
  },

  textInput: {
    borderColor: "royalblue",
    borderWidth: 1,
    height: 40,
    width: 220,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 17,
    marginBottom: 5,
    marginTop: 10,
  },
});
export default EditDelete;
