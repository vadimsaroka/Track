// import React, { useContext } from "react";
// import { Text, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
// import MapView, { Polyline, Circle } from "react-native-maps";
// import { Context as LocationContext } from "../context/LocationContext";

// const win = Dimensions.get("window");

// console.log(win.width, win.height);

// const Map = () => {
//   const {
//     state: { currentLocation, locations },
//   } = useContext(LocationContext);

//   if (!currentLocation) {
//     return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
//   }

//   console.log(currentLocation.coords);
//   return (
//     <MapView
//       style={styles.map}
//       initialRegion={{
//         ...currentLocation.coords,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       }}
//       region={{
//         ...currentLocation.coords,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       }}
//     >
//       <Circle
//         radius={40}
//         strokeColor="rgba(158, 158,255, 1.0)"
//         fillColor="rgba(158, 158, 255, .1)"
//         center={currentLocation.coords}
//       />
//       <Polyline coordinates={locations.map((loc) => loc.coords)} />
//     </MapView>
//   );
// };

// const styles = StyleSheet.create({
//   map: {
//     height: win.height / 2,
//   },
// });

// export default Map;
