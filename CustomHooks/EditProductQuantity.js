"use strict";

const { Alert } = require("react-native");

const myURL = "https://invkom-backend.herokuapp.com";

async function useEditQuantity(values, token, setToggleModal) {
  const { quantity, productCode } = values;
  try {
    const response = await fetch(`${myURL}/edit-quantity`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productCode,
        quantity: parseInt(quantity),
      }),
    });
    const toJson = await response.json();
    console.log(toJson);

    setToggleModal(false);

    Alert.alert("Success", "Editing Quantity Done Successfully !");
  } catch (error) {
    console.error(error);
  }
}
module.exports = useEditQuantity;
