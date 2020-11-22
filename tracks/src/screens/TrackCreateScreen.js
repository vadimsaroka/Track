import "../_mockLocation";
import React, { useContext, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
import useLocation from "../hooks/useLocation";
import Map from "../components/Map";
import { Context as LocationContext } from "../context/LocationContext";
import TrackFrom from "../components/TrackForm";
import Chart from "../components/Speedometer";
import Spinner from "../components/Spinner";

const Stack = createStackNavigator();

const TrackCreateScreen = () => {
  const { state, addLocation } = useContext(LocationContext);

  const callback = useCallback(
    (location) => {
      addLocation(location, state.recording);
    },
    [state.recording]
  );

  const isFocused = useIsFocused();

  const [err] = useLocation(isFocused || state.recording, callback);

  const speed =
    state.currentLocation !== null ? state.currentLocation.coords.speed : 0;

  function createTrack() {
    return (
      <View style={styles.container}>
        {/* <Map /> */}
        <Chart speed={speed} />
        {err ? <Text>Please enable location services</Text> : null}
        <TrackFrom />
      </View>
    );
  }

  return isFocused ? (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "rgb(29, 38, 54)",
          shadowOffset: {
            height: 0,
          },
        },
        headerTintColor: "rgb(146, 171, 207)",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="Add Track" component={createTrack} />
    </Stack.Navigator>
  ) : (
    <Spinner />
  );

  // return isFocused ? (
  //   <View style={styles.container}>
  //     {/* <Map /> */}
  //     <Chart speed={speed} />
  //     {err ? <Text>Please enable location services</Text> : null}
  //     <TrackFrom />
  //   </View>
  // ) : (
  //   <Spinner />
  // );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(29, 38, 54)",
    flex: 1,
  },
  speedometer: {},
});

export default TrackCreateScreen;
