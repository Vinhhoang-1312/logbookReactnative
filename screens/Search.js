import "react-native-gesture-handler";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { DatabaseConnection } from "../database/connectdatabase";
const db = DatabaseConnection.getConnection();

const Search = ({ navigation }) => {
  const [searchType, setSearchType] = useState("");
  const [Data, setData] = useState([]);

  const searchPropertyType = () => {
    {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Databaselogbookrentalz where propertytype = ?",
          [searchType],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setSearchType(temp);

            if (results.rows.length >= 1) {
              setData(results.rows.item(0));
            }
          }
        );
      });
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}>
      <Text style={{ fontSize: 24, textAlign: "center", color: "#000" }}>
        Search
      </Text>
      <TextInput
        style={styles.InputData}
        onChangeText={(searchType) => setSearchType(searchType)}
        placeholder="Enter propertytype"
      />

      <TouchableOpacity
        style={[styles.touchstyle, { marginTop: 20 }]}
        onPress={searchPropertyType}
      >
        <Text style={styles.touchstyleText}> Sreach </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Details", { Data })}
      >
        <Text style={styles.Text}>Property type :</Text>
        <Text style={styles.Data}>{Data.propertytype}</Text>

        <Text style={styles.Text}>Datetime :</Text>
        <Text style={styles.Data}>{Data.dateandtime}</Text>

        <Text style={styles.Text}>Monthly rent price :</Text>
        <Text style={styles.Data}>{Data.price}</Text>

        <Text style={styles.Text}>Name of the reporter :</Text>
        <Text style={styles.Data}>{Data.reporter}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
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

  touchstyle: {
    marginTop: 10,
    marginBottom: 40,
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
    padding: 10,
  },

  InputData: {
    height: 45,
    width: "90%",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#00B8D4",
    borderRadius: 7,
    marginTop: 15,
  },
});

export default Search;
