import "react-native-gesture-handler";
import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import AccountScreen from "./src/screens/AccountScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import {
  Provider as AuthProvider,
  Context as AuthContext,
} from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
  const { state, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <NavigationContainer>
      {state.token ? (
        <Tab.Navigator
          initialRouteName="AccountScreen"
          tabBarOptions={{
            activeTintColor: "rgb(17, 236, 229)",
            inactiveTintColor: "rgb(146, 171, 207)",
            inactiveBackgroundColor: "rgb(29, 38, 54)",
            activeBackgroundColor: "rgb(29, 38, 54)",
            style: {
              borderTopWidth: 0,
              // borderTopColor: "transparent",
              // elevation: 0,
              // shadowColor: "#5bc4ff",
              // shadowOpacity: 0,
              // shadowOffset: {
              //   height: 0,
              // },
              // shadowRadius: 0,
            },
          }}
        >
          <Tab.Screen
            name="TrackListScreen"
            component={TrackListScreen}
            options={{
              tabBarLabel: "Tracks List",
              tabBarIcon: ({ focused }) => (
                <FontAwesome
                  name="list"
                  size={20}
                  color={focused ? "rgb(17, 236, 229)" : "rgb(146, 171, 207)"}
                />
              ),
            }}
          />
          <Tab.Screen
            name="TrackCreateScreen"
            component={TrackCreateScreen}
            options={{
              tabBarLabel: "Add Track",
              tabBarIcon: ({ focused }) => (
                <FontAwesome
                  name="plus"
                  size={20}
                  color={focused ? "rgb(17, 236, 229)" : "rgb(146, 171, 207)"}
                />
              ),
            }}
          />
          <Tab.Screen
            name="AccountScreen"
            component={AccountScreen}
            options={{
              tabBarLabel: "My Account",
              tabBarIcon: ({ focused }) => (
                <FontAwesome
                  name="gear"
                  size={20}
                  color={focused ? "rgb(17, 236, 229)" : "rgb(146, 171, 207)"}
                />
              ),
              tabBarBadge: 3,
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SigninScreen"
            component={SigninScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
