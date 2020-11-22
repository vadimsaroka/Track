import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import Spacer from "../components/Spacer";

const SigninScreen = ({ navigation }) => {
  const { state, clearErrorMessage, signin } = useContext(AuthContext);

  React.useEffect(() => {
    navigation.addListener("blur", () => {
      clearErrorMessage();
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign In"
        errorMessage={state.errorMessage}
        onSubmit={signin}
      />
      <Spacer />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignupScreen");
        }}
      >
        <Text style={styles.text}>
          Don't have an account? Click here to signup
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgb(29, 38, 54)"
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
    marginLeft: 8,
    marginBottom: 8,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: "rgb(146, 171, 207)"
  },
});

export default SigninScreen;
