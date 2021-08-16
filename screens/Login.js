import React, { useEffect, useContext, useRef } from "react";
import * as yup from "yup";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { Formik } from "formik";
import { myContext } from "../Context/myContext.js";

// Backend API
const myURL = "https://invkom-backend.herokuapp.com";

// To validate the form
const ReviewSchema = yup.object({
  Email: yup.string().required(),
  Password: yup.string().required(),
});

const Login = ({ navigation }) => {
  const { token, setToken, error, setError, user, setUser } =
    useContext(myContext);

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

  // Handle submitting the form (two arguments Form Values and Form Actions).
  const handleLoginSubmit = async (values, actions) => {
    const { Email, Password } = values;

    try {
      // fetch data from my backend API
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
      if (toJson.token) {
        setUser(toJson.response);
        setToken(toJson.token);
      }
    } catch (error) {
      Alert.alert("Oops", "Invalid Email or Password !", [
        {
          text: "Try Again",
        },
      ]);
      console.error(error);
    }

    // Reset Form input values
    actions.resetForm();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={myStyles.container}>
        <Text style={myStyles.title}>Login</Text>

        <Formik
          initialValues={{ Email: "", Password: "" }}
          onSubmit={handleLoginSubmit}
          validationSchema={ReviewSchema}
        >
          {(formikProps) => (
            <View>
              <Text style={myStyles.text}>Email</Text>
              <TextInput
                style={myStyles.input}
                onChangeText={formikProps.handleChange("Email")}
                onBlur={formikProps.handleBlur("Email")}
                value={formikProps.values.Email}
                autoCompleteType="email"
              />

              <Text style={myStyles.errorText}>
                {formikProps.touched.Email && formikProps.errors.Email}
                {"\n"}
              </Text>

              <Text style={myStyles.text}>Password</Text>
              <TextInput
                secureTextEntry={true}
                style={myStyles.input}
                onBlur={formikProps.handleBlur("Password")}
                autoCompleteType="password"
                onChangeText={formikProps.handleChange("Password")}
                value={formikProps.values.Password}
              />

              <Text style={myStyles.errorText}>
                {formikProps.touched.Password && formikProps.errors.Password}
              </Text>

              <Separator />
              <Button
                title="Login"
                style={myStyles.btn}
                onPress={formikProps.handleSubmit}
              />
            </View>
          )}
        </Formik>
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
  errorText: {
    color: "red",
    fontSize: 10,
    maxWidth: "55%",
  },
});
