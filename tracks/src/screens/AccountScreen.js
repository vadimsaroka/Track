import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";

const Stack = createStackNavigator();

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  function Account() {
    return (
      <SafeAreaView style={styles.container}>
        <Spacer>
          <Button
            title="SIGN OUT"
            onPress={signout}
            titleStyle={{ color: "rgb(33, 44, 61)" }}
            linearGradientProps={{
              colors: ["rgb(17, 236, 229)", "rgb(17, 236, 229)"],
            }}
          />
        </Spacer>
      </SafeAreaView>
    );
  }
  return (
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
      <Stack.Screen name="My Account" component={Account} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(29, 38, 54)",
    flex: 1,
    justifyContent: "center",
  },
});

export default AccountScreen;
