import { Formik } from "formik";
import React, { useContext, useEffect } from "react";
import {
  Alert, Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View
} from "react-native";
import * as yup from "yup";
import { myContext } from "../Context/myContext.js";
import useAddProduct from "../CustomHooks/AddProductHook.js";
import useInvStatement from "../CustomHooks/InvStatementHook";


const ReviewSchema = yup.object({
  productCode: yup.string().required(),
  productName: yup.string().required(),
  productPrice: yup.number().required(),
  quantity: yup.number().required(),
});

const AddProduct = ({ navigation }) => {
  const Separator = () => <View style={myStyles.separator} />;
  const { token, text, invStatement, setInvStatement } = useContext(myContext);

  useEffect(() => {
    useInvStatement(token, setInvStatement);
  }, []);

  const handleAddProductSubmit = (values, actions) => {
    const uniqueValuesFromInv = invStatement.filter(
      (item) => item.productCode === values.productCode
    );

    if (uniqueValuesFromInv.length >= 1) {
      Alert.alert("Error", "Product already in your inventory !", [
        {
          text: "Close",
        },
      ]);
    } else {
      useAddProduct(values, navigation, token);
      actions.resetForm();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={myStyles.container}>
        <Text style={myStyles.title}>Add Product</Text>

        <Formik
          initialValues={{
            productCode: "",
            productName: "",
            productPrice: "",
            quantity: "",
            description: "",
          }}
          validationSchema={ReviewSchema}
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
                onBlur={formikProps.handleBlur("productCode")}
                placeholder="Paste the code here"
                placeholderTextColor="#ffff"
                onChangeText={formikProps.handleChange("productCode")}
                value={formikProps.values.productCode}
              />
              <Text style={myStyles.errorText}>
                {formikProps.touched.productCode &&
                  formikProps.errors.productCode}
                {"\n"}
              </Text>

              <TextInput
                style={myStyles.input}
                placeholderTextColor="#ffff"
                placeholder="Product Name"
                onChangeText={formikProps.handleChange("productName")}
                onBlur={formikProps.handleBlur("productName")}
                value={formikProps.values.productName}
              />
              <Text style={myStyles.errorText}>
                {formikProps.touched.productName &&
                  formikProps.errors.productName}
                {"\n"}
              </Text>

              <TextInput
                keyboardType="number-pad"
                placeholderTextColor="#ffff"
                placeholder="Product Price"
                style={myStyles.input}
                onChangeText={formikProps.handleChange("productPrice")}
                onBlur={formikProps.handleBlur("productPrice")}
                value={formikProps.values.productPrice}
              />

              <Text style={myStyles.errorText}>
                {formikProps.touched.productPrice &&
                  formikProps.errors.productPrice}
                {"\n"}
              </Text>

              <TextInput
                keyboardType="number-pad"
                placeholderTextColor="#ffff"
                placeholder="Quantity"
                style={myStyles.input}
                onChangeText={formikProps.handleChange("quantity")}
                onBlur={formikProps.handleBlur("quantity")}
                value={formikProps.values.quantity}
              />

              <Text style={myStyles.errorText}>
                {formikProps.touched.quantity && formikProps.errors.quantity}
                {"\n"}
              </Text>

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
