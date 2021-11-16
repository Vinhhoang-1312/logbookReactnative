import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  View,
  Button,
  ImageBackground,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "../components/CustomButton";
import { DatabaseConnection } from "../database/connectdatabase";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
const db = DatabaseConnection.getConnection();
const image = {
  uri: "https://img.nh-hotels.net/anantara_plaza_nice_hotel-017-rooms.jpg?output-quality=80&resize=1600:*&background-color=white",
};
const Home = ({ navigation }) => {
  const [propertytype, setpropertytype] = useState("");
  const [bedrooms, setbedrooms] = useState("1");
  const [dateandtime, setdateandtime] = useState("");
  const [price, setprice] = useState("");
  const [furniture, setfurniture] = useState("Fully Furnished");
  const [notes, setnotes] = useState("");
  const [reporter, setreporter] = useState("");

  useEffect(() => {
    createTable();
    getDatabaselogbookrentalz();
  }, []);

  const submitdata = () => {
    Alert.alert("Confirm", "Are you sure?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          if (
            propertytype.length === 0 ||
            bedrooms.length === 0 ||
            dateandtime.length === 0 ||
            price.length === 0 ||
            reporter.length === 0
          ) {
            Alert.alert(
              "Some of your information is missing !!! Please check again"
            );
          } else {
            try {
              db.transaction((tx) => {
                tx.executeSql(
                  "INSERT INTO Databaselogbookrentalz(propertytype, bedrooms,dateandtime,price,furniture,notes,reporter) VALUES (?,?,?,?,?,?,?);",

                  [
                    propertytype,
                    bedrooms,
                    dateandtime,
                    price,
                    furniture,
                    notes,
                    reporter,
                  ],
                  (tx, results) => {
                    console.log("Results", results.rowsAffected);
                    if (results.rowsAffected > 0) {
                      Alert.alert("Database Inserted Successfully....");
                    } else Alert.alert("Failed....");
                  }
                );
              });
              navigation.navigate("Result");
              setpropertytype("");
              setbedrooms("1");
              setdateandtime("");
              setfurniture("Fully Furnished");
              setnotes("");
              setprice("");
              setreporter("");
            } catch (error) {
              console.log(error);
            }
          }
        },
      },
    ]);
  };

  const getDatabaselogbookrentalz = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Databaselogbookrentalz",
          [],
          (tx, result) => {
            console.log(JSON.stringify(result.rows));
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createTable = () => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Databaselogbookrentalz'",
        [],
        function (tx, res) {
          if (res.rows.length == 0) {
            tx.executeSql("DROP TABLE IF EXISTS Databaselogbookrentalz", []);
            tx.executeSql(
              "CREATE TABLE IF NOT EXISTS Databaselogbookrentalz(Id INTEGER PRIMARY KEY AUTOINCREMENT,propertytype VARCHAR(255),bedrooms VARCHAR(255) ,dateandtime datetime, price INT(11),furniture VARCHAR(255) , notes VARCHAR(255), reporter VARCHAR(255));"
            );
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
      >
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.form}>
            <Text style={styles.head}>Welcome</Text>
            <Text style={styles.text}>Property type:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setpropertytype(value)}
              value={propertytype}
            />

            <Text style={styles.text}>Bedrooms :</Text>

            <Picker
              selectedValue={bedrooms}
              style={{
                height: 40,
                width: 240,
                borderWidth: 1,
                borderRadius: 5,
                marginLeft: 15,
                fontSize: 17,
                marginBottom: 5,
                marginTop: 10,
              }}
              onValueChange={(itemValue, itemIndex) => setbedrooms(itemValue)}
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
            </Picker>
            <Text style={styles.text}>Data and Time :</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setdateandtime(value)}
              value={dateandtime}
            />

            <Text style={styles.text}>Monthly rent price - dollar$:</Text>
            <TextInput
              style={styles.input}
              keyboardType={"numeric"}
              onChangeText={(value) => setprice(value)}
              value={price.toString()}
            />

            <Text style={styles.text}>Furniture types :</Text>

            <Picker
              selectedValue={furniture}
              style={{
                height: 40,
                width: 240,
                borderWidth: 1,
                borderRadius: 5,
                marginLeft: 15,
                fontSize: 17,
                marginBottom: 5,
                marginTop: 10,
              }}
              onValueChange={(itemValue, itemIndex) => setfurniture(itemValue)}
            >
              <Picker.Item label="Fully Furnished" value="Fully Furnished" />
              <Picker.Item label="Unfurnished" value="Unfurnished" />
              <Picker.Item label="Semi Furnished" value="Semi Furnished" />
            </Picker>

            <Text style={styles.text}>Notes :</Text>
            <TextInput
              style={{
                borderWidth: 1,
                height: 80,
                width: 240,
                borderRadius: 5,
                textAlign: "center",
                fontSize: 17,
                marginLeft: 15,
                marginBottom: 10,
                marginTop: 10,
              }}
              multiline
              numberOfLines={4}
              onChangeText={(value) => setnotes(value)}
              value={notes}
            />

            <Text style={styles.text}>Name of the reporter :</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setreporter(value)}
              value={reporter}
            />

            <CustomButton title="submit" handlePress={submitdata} />
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  head: {
    marginTop: 5,
    marginBottom: 20,
    marginLeft: 70,
    textAlign: "center",
    justifyContent: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
  form: {
    alignSelf: "center",
    width: "80%",
    height: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    top: "1%",
    left: "1%",
    right: "1%",
    bottom: "5%",
    paddingBottom: 80,
    paddingRight: 80,
  },
  scrollView: {
    backgroundColor: "white",
  },
  container: {},
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginLeft: 20,
    marginTop: 20,
    textAlign: "left",
    color: "black",

    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    height: 40,
    width: 240,
    borderRadius: 5,
    textAlign: "center",
    marginLeft: 15,
    fontSize: 17,
    marginBottom: 5,

    marginTop: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 20,
    paddingRight: 10,
  },
});
export default Home;
