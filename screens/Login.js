import React, { useEffect, useContext, useRef } from "react";
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
const myURL = "https://invkom-backend.herokuapp.com";

const Login = ({ navigation }) => {
  const { token, setToken, error, setError } = useContext(myContext);

  // This to prevent useEffect from rendering at the initial render
  const initialRender = useRef(true);

  useEffect(() => {
    setError(null);
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      navigation.navigate("UserPage");
    }
  }, [token]);

  const Separator = () => <View style={myStyles.separator} />;

  const handleLoginSubmit = async (values, actions) => {
    const { Email, Password } = values;
    try {
      const response = await fetch(`${myURL}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: Email,
          password: Password,
        }),
      });
      const toJson = await response.json();

      console.log(toJson);
      setToken(toJson.token);
    } catch (error) {
      console.error(error);
      setError("Incorrect Email or Password");
    }

    actions.resetForm();
  };

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
