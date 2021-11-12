import React, { useState } from "react";
import {
  Button,
  Platform,
  Text,
  Vibration,
  View,
  SafeAreaView,
  StyleSheet,
  Alert,
} from "react-native";
import { Audio } from "expo-av";

const Notification = () => {
  const ringbell = () => {
    // it should be async function .
    (async () => {
      const play_yes = await Audio.Sound.createAsync(
        require("../assets/bell.mp3"),
        { shouldPlay: true }
      );
    })();
  };

  const Alertapi = () =>
    Alert.alert("Select", "Vibrate - Ring a bell", [
      { text: "Ring a bell", onPress: ringbell },
      {
        text: "Vibrate",
        onPress: () => Vibration.vibrate(DURATION),
      },
    ]);
  const DURATION = 2000;

  return (
    <SafeAreaView style={styles.home}>
      <View>
        <Button title={"Select Alert"} onPress={Alertapi} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: "#F2F3F4",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Notification;
