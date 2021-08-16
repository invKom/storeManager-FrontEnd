import React from "react";
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
import * as yup from "yup";
import useRegister from "../CustomHooks/RegisterHook.js";
const validator =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

const ReviewSchema = yup.object({
  Email: yup.string().required(),
  Password: yup
    .string()
    .required()
    .test(
      "testing-password",
      "Minimum 6 characters, letters, numbers and special characters",
      (val) => {
        return validator.test(val);
      }
    ),
  userName: yup.string().required().min(3),
});

const Register = ({ navigation }) => {
  const Separator = () => <View style={myStyles.separator} />;

  const handleRegisterSubmit = (values, actions) => {
    useRegister(values, navigation);
    actions.resetForm();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={myStyles.container}>
        <Text style={myStyles.title}>Register</Text>

        <Formik
          initialValues={{ Email: "", Password: "", userName: "" }}
          validationSchema={ReviewSchema}
          onSubmit={handleRegisterSubmit}
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

              <Text style={myStyles.text}>User Name</Text>
              <TextInput
                style={myStyles.input}
                onChangeText={formikProps.handleChange("userName")}
                onBlur={formikProps.handleBlur("userName")}
                value={formikProps.values.userName}
                autoCompleteType="username"
              />
              <Text style={myStyles.errorText}>
                {formikProps.touched.userName && formikProps.errors.userName}
                {"\n"}
              </Text>

              <Text style={myStyles.text}>Password</Text>
              <TextInput
                secureTextEntry={true}
                style={myStyles.input}
                autoCompleteType="password"
                onChangeText={formikProps.handleChange("Password")}
                onBlur={formikProps.handleBlur("Password")}
                value={formikProps.values.Password}
              />

              <Text style={myStyles.errorText}>
                {formikProps.touched.Password && formikProps.errors.Password}
              </Text>

              <Separator />

              <Button
                title="Register"
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

export default Register;

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
