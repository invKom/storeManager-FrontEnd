import React, { useContext, useEffect } from "react";
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

import useAddProduct from "../CustomHooks/AddProductHook.js";
import { myContext } from "../Context/myContext.js";

const AddProduct = ({ navigation }) => {
  const { token, text } = useContext(myContext);

  const Separator = () => <View style={myStyles.separator} />;

  const handleAddProductSubmit = (values, actions) => {
    useAddProduct(values, navigation, token);
    actions.resetForm();
  };

  return !token ? (
    <View style={styles.container}>
      <Text> You have to be Logged in !</Text>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
    </View>
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={myStyles.container}>
        <Text style={myStyles.title}>Add Product</Text>

        <Formik
          initialValues={{
            productCode: text,
            productName: "",
            productPrice: "",
            quantity: "",
            description: "",
          }}
          onSubmit={handleAddProductSubmit}
        >
          {(formikProps) => (
            <View>
              <Button
                title="Scan Product Code"
                style={myStyles.btn}
                onPress={() => navigation.navigate("Scanning")}
              />

              <TextInput
                style={myStyles.input}
                onChangeText={formikProps.handleChange("productCode")}
                onBlur={formikProps.handleBlur("productCode")}
                value={formikProps.values.productCode}
              />

              <TextInput
                style={myStyles.input}
                placeholderTextColor="#ffff"
                placeholder="Product Name"
                onChangeText={formikProps.handleChange("productName")}
                onBlur={formikProps.handleBlur("productName")}
                value={formikProps.values.productName}
              />

              <TextInput
                keyboardType="number-pad"
                placeholderTextColor="#ffff"
                placeholder="Product Price"
                style={myStyles.input}
                onChangeText={formikProps.handleChange("productPrice")}
                onBlur={formikProps.handleBlur("productPrice")}
                value={formikProps.values.productPrice}
              />

              <TextInput
                keyboardType="number-pad"
                placeholderTextColor="#ffff"
                placeholder="Quantity"
                style={myStyles.input}
                onChangeText={formikProps.handleChange("quantity")}
                onBlur={formikProps.handleBlur("quantity")}
                value={formikProps.values.quantity}
              />

              <TextInput
                placeholder="Description"
                placeholderTextColor="#ffff"
                style={myStyles.input}
                onChangeText={formikProps.handleChange("description")}
                onBlur={formikProps.handleBlur("description")}
                value={formikProps.values.description}
              />

              <Separator />

              <Button
                title="Add Product"
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

export default AddProduct;

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
  errorText: {
    color: "red",
    fontSize: 10,
    maxWidth: "55%",
  },
});
