import React, { useContext } from "react";
const { myContext } = require("../Context/myContext");

const myURL = "https://invkom-backend.herokuapp.com";

async function useAddProduct(values, navigation) {
  const { productName, productPrice, productCode, quantity, description } =
    values;

  const { token } = useContext(myContext);

  try {
    const response = await fetch(`${myURL}/addProduct`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        productName,
        productPrice,
        productCode,
        quantity,
        description,
      }),
    });
    const toJson = await response.json();

    console.log(toJson);

    navigation.navigate("AddProduct");
  } catch (error) {
    console.error(error);
  }
}
module.exports = useAddProduct;
