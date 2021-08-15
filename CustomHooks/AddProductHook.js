import { Alert } from "react-native";

const myURL = "https://invkom-backend.herokuapp.com";

async function useAddProduct(values, navigation, myToken) {
  const { productName, productPrice, productCode, quantity, description } =
    values;

  try {
    const response = await fetch(`${myURL}/addProduct`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${myToken}`,
      },
      body: JSON.stringify({
        productName,
        productPrice: parseInt(productPrice),
        productCode,
        quantity: parseInt(quantity),
        description,
      }),
    });
    const toJson = await response.json();
    console.log(toJson);

    if (toJson.response === "product added successfully") {
      return Alert.alert("Done", "Product Added Successfully", [
        {
          text: "Close",
        },
      ]);
    }
  } catch (error) {
    console.error(error);
  }
}
module.exports = useAddProduct;
