import React from "react";
import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import { Formik } from "formik";
import { styles } from "styled-system";

const Register = () => {
  const [show, setShow] = React.useState(false);
  const handleShowPass = () => setShow(!show);

  const Separator = () => <View style={myStyles.separator} />;

  const handleLoginSubmit = (values) => {};

  return (
    <>
      <View style={myStyles.container}>
        <Formik
          initialValues={{ Email: "", Password: "", userName: "" }}
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

              <Text style={myStyles.text}>User Name</Text>
              <TextInput
                style={myStyles.input}
                onChangeText={formikProps.handleChange("userName")}
                value={formikProps.values.userName}
                autoCompleteType="username"
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
                title="Register"
                style={myStyles.btn}
                onPress={formikProps.handleSubmit}
              />
            </View>
          )}
        </Formik>
      </View>
    </>
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
});
