import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { color } from "react-native-reanimated";

const Spinner = () => (
  <View style={[styles.container, styles.vertical]}>
    {/* <ActivityIndicator /> */}
    <ActivityIndicator size="large" />
    <Text style={{ color: "rgb(146, 171, 207)" }}>Loading...</Text>
    {/* <ActivityIndicator size="small" color="#0000ff" />
    <ActivityIndicator size="large" color="#00ff00" /> */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    zIndex: 1000,
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    opacity: 0.5,
    backgroundColor: "rgb(29, 38, 54)",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  vertical: {
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default Spinner;
