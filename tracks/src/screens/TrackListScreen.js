import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";
import { ListItem } from "react-native-elements";
import { useIsFocused, CommonActions } from "@react-navigation/native";
import { Context as TrackContext } from "../context/TrackContext";
import TrackDetailScreen from "../screens/TrackDetailScreen";
import { SwipeListView } from "react-native-swipe-list-view";
import Spinner from "../components/Spinner";

const Stack = createStackNavigator();

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks, deleteTrack } = useContext(TrackContext);
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      setVisible(null);
      fetchTracks();
      setVisible(true);
    }, [])
  );

  function TrackScreen() {
    let trackId;

    const renderHiddenItem = (id) => (
      <TouchableHighlight
        style={styles.rowBack}
        onPress={async () => {
          try {
            setVisible(null);
            await deleteTrack(id);
            fetchTracks();
            setVisible(true);
          } catch (err) {
            console.error(err);
          }
        }}
      >
        <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
          <Text style={styles.backTextWhite}>Delete</Text>
        </View>
      </TouchableHighlight>
    );

    return (
      <>
        <SwipeListView
          style={styles.container}
          disableRightSwipe
          useNativeDriver={false}
          data={state}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => {
            trackId = item._id;
            return (
              <TouchableHighlight
                onPress={() => {
                  navigation.dispatch(
                    CommonActions.navigate({
                      name: "Track Details",
                      params: {
                        _id: item._id,
                      },
                    })
                  );
                }}
              >
                <ListItem
                  key={trackId}
                  // bottomDivider
                  // topDivider
                  linearGradientProps={{
                    colors:
                      index % 2 === 0
                        ? ["#0f1724", "#0f1724"]
                        : ["rgb(29, 38, 54)", "rgb(29, 38, 54)"],
                  }}
                >
                  <ListItem.Content>
                    <ListItem.Title style={{ color: "rgb(146, 171, 207)" }}>
                      {item.name}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron color="rgb(146, 171, 207)" />
                </ListItem>
              </TouchableHighlight>
            );
          }}
          renderHiddenItem={() => renderHiddenItem(trackId)}
          rightOpenValue={-85}
        />
        {visible ? null : <Spinner />}
      </>
    );
  }

  return isFocused ? (
    <Stack.Navigator
      initialRouteName="Tracks List"
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
      <Stack.Screen name="Tracks List" component={TrackScreen} />
      <Stack.Screen name="Track Details" component={TrackDetailScreen} />
    </Stack.Navigator>
  ) : (
    <Spinner />
  );
};

const styles = StyleSheet.create({
  rowBack: {
    alignItems: "center",
    backgroundColor: "rgb(255, 0, 87)",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backTextWhite: {
    color: "#FFF",
    fontSize: 16,
  },
  backRightBtnRight: {
    backgroundColor: "rgb(255, 0, 87)",
    right: 0,
  },
  container: {
    backgroundColor: "rgb(29, 38, 54)",
    flex: 1,
  },
});

export default TrackListScreen;
