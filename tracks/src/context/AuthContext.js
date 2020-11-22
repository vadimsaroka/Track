import { AsyncStorage } from "react-native";
import createDtataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { token: action.payload, errorMessage: "" };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "sign_out":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const isLoggedIn = (dispatch) => async () => {
  await AsyncStorage.getItem("token", (err, token) => {
    dispatch({ type: "signin", payload: token });
    if (err) {
      console.log(`error: ${err}`);
    }
  });
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => {
  return async ({ email, password, passwordConfirm }) => {
    try {
      const response = await trackerApi.post("/signup", { email, password, passwordConfirm });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
    } catch (err) {
      console.log(err.response.data);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up",
      });
    }
  };
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
    } catch (err) {
      console.log(err.response.data);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in",
      });
    }
  };
};

const signout = (dispatch) => async () => {
  try {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "sign_out" });
  } catch (err) {
    console.log(err);
  }
};

export const { Context, Provider } = createDtataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, isLoggedIn },
  { token: null, errorMessage: "" }
);
