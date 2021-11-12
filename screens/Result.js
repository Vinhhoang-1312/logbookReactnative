import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { DatabaseConnection } from "../database/connectdatabase";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
const db = DatabaseConnection.getConnection();
function Result({ navigation }) {
  const [items, setItems] = useState([]);
  const [empty, setEmpty] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Databaselogbookrentalz",
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setItems(temp);
          if (results.rows.length >= 1) {
            setEmpty(false);
          } else {
            setEmpty(true);
          }
        }
      );
    });
  }, []);

  const listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: "100%",
          backgroundColor: "black",
        }}
      />
    );
  };

  const emptydata = () => {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          You don't have any data yet !!!
        </Text>
      </View>
    );
  };

  const navigateToEditDelete = (
    Id,
    propertytype,
    bedrooms,
    dateandtime,
    price,
    furniture,
    notes,
    reporter
  ) => {
    navigation.navigate("EditDelete", {
      Id: Id,
      propertytype: propertytype,
      bedrooms: bedrooms,
      dateandtime: dateandtime,
      price: price,
      furniture: furniture,
      notes: notes,
      reporter: reporter,
    });
  };

  return (
    <View style={styles.data}>
      {empty ? (
        emptydata(empty)
      ) : (
        <FlatList
          data={items}
          ItemSeparatorComponent={listViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View key={item.Id} style={{ padding: 20 }}>
              <TouchableOpacity
                onPress={() =>
                  navigateToEditDelete(
                    item.Id,
                    item.propertytype,
                    item.bedrooms,
                    item.dateandtime,
                    item.price,
                    item.furniture,
                    item.notes,
                    item.reporter
                  )
                }
              >
                <Text style={styles.text}> Id: {item.Id} </Text>
                <Text style={styles.text}> property: {item.propertytype} </Text>
                <Text style={styles.text}> bedrooms: {item.bedrooms} </Text>
                <Text style={styles.text}> datetime: {item.dateandtime} </Text>
                <Text style={styles.text}> monthlyprice: {item.price} </Text>
                <Text style={styles.text}> furniture: {item.furniture} </Text>
                <Text style={styles.text}> note: {item.notes} </Text>
                <Text style={styles.text}> namereporter: {item.reporter} </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  data: {
    flex: 1,
  },

  touchableOpacity: {
    backgroundColor: "#0091EA",
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  text: {
    fontSize: 22,
    color: "#000",
  },
});
export default Result;
