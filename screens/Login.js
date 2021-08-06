import React, { useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import { myContext } from "../Context/myContext.js";
import useLogin from "../CustomHooks/LoginHook.js";
const myURL = "https://invkom-backend.herokuapp.com";

const Login = ({ navigation }) => {
  const { token, setToken, error, setError } = useContext(myContext);

  useEffect(() => {
    setError(null);
  }, []);

  const Separator = () => <View style={myStyles.separator} />;

  const handleLoginSubmit = (values, actions) => {
    useLogin(values, navigation, token, setToken, error, setError);
    actions.resetForm();
  };
  // something wrong with the token
  console.log(token);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={myStyles.container}>
        <Text style={myStyles.title}>Login</Text>

        <Formik
          initialValues={{ Email: "", Password: "" }}
          onSubmit={handleLoginSubmit}
        >
          {(formikProps) => (
            <View>
              <Text style={myStyles.text}>Email</Text>
              <TextInput
                style={myStyles.input}
                onChangeText={formikProps.handleChange("Email")}
                value={formikProps.values.Email}
                autoCompleteType="email"
              />

              <Text style={myStyles.text}>Password</Text>
              <TextInput
                secureTextEntry={true}
                style={myStyles.input}
                autoCompleteType="password"
                onChangeText={formikProps.handleChange("Password")}
                value={formikProps.values.Password}
              />

              <Separator />
              <Button
                title="Login"
                style={myStyles.btn}
                onPress={formikProps.handleSubmit}
              />
            </View>
          )}
        </Formik>

        {error ? <Text style={myStyles.error}>{error}</Text> : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const myStyles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  title: {
    textAlign: "center",
    color: "#ffff",
    fontSize: 40,
    marginBottom: 70,
  },
  input: {
    textDecorationColor: "#ffff",
    color: "#ffff",
    marginBottom: "3%",
    width: 250,
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ffff",
  },
  btn: {
    color: "#ffff",
    width: 200,
  },
  text: {
    color: "#ffff",
  },

  separator: {
    marginVertical: 20,
    borderBottomColor: "#ffff",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  error: {
    color: "red",
    textAlign: "left",
    fontSize: 15,
  },
});
