import { View, Text, StyleSheet } from "react-native";
import React from "react";
import HomeScreenButton from "./HomeScreenButton";
import { GlobalStyles as gs } from "../../utils/styles";

export default function BottomDisplay() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <HomeScreenButton
          name="clinic-medical"
          size={24}
          color="blue"
          lib="f"
          title="Resources"
          onPress={() => {
            console.log("Request Resources");
          }}
        />
        <HomeScreenButton
          name="heart-plus"
          size={24}
          color="blue"
          title="Donations"
          lib="mc"
        />
      </View>
      <View style={styles.buttonContainer}>
        <HomeScreenButton
          name="volunteer-activism"
          size={24}
          color="blue"
          title="Volunteer"
          lib="m"
        />
        <HomeScreenButton
          name="logout"
          size={24}
          color="red"
          lib="m"
          title="Logout"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: gs.colors.homeScreenBackground,
    margin: 20,
    marginTop: 40,
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  buttonContainer: {
    alignItems: "center",
    width: "50%",
  },
});