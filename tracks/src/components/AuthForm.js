import React, { useState } from "react";
import { Text, Button, Input } from "react-native-elements";
import { StyleSheet } from "react-native";
import Spacer from "../components/Spacer";

const AuthForm = ({ headerText, errorMessage, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <>
      <Spacer>
        <Text style={{ textAlign: "center", color: "rgb(146, 171, 207)" }} h3>
          {headerText}
        </Text>
      </Spacer>
      <Spacer>
        <Input
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          label="Email"
          value={email}
          onChangeText={(email) => {
            setEmail(email);
          }}
        />
      </Spacer>
      <Spacer>
        <Input
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          label="Password"
          value={password}
          onChangeText={(password) => {
            setPassword(password);
          }}
        />
      </Spacer>
      {headerText === "Sign Up" ? (
        <Spacer>
          <Input
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            label="Repeat Password"
            value={passwordConfirm}
            onChangeText={(passwordConfirm) => {
              setPasswordConfirm(passwordConfirm);
            }}
          />
        </Spacer>
      ) : null}
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title={headerText}
          onPress={() => {
            onSubmit({ email, password, passwordConfirm });
          }}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    color: "red",
    fontSize: 16,
    marginLeft: 8,
    marginBottom: 8,
  },
  input: {
    color: "rgb(146, 171, 207)",
  },
});

export default AuthForm;
