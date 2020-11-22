import React, { useContext } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";

const Stack = createStackNavigator();
const win = Dimensions.get("window");

const TrackDetailScreen = ({ route }) => {
  const { state } = useContext(TrackContext);
  const _id = route.params._id;

  const track = state.find((t) => t._id === _id);
  const initialCoords = track.locations[0].coords;

  function details() {
    return (
      <MapView
        style={styles.map}
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initialCoords,
        }}
      >
        <Polyline coordinates={track.locations.map((loc) => loc.coords)} />
      </MapView>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Track Details" component={details} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  map: { height: win.height / 2 },
  container: {
    backgroundColor: "rgb(29, 38, 54)",
    flex: 1,
  },
});

export default TrackDetailScreen;
