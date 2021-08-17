const myURL = "https://invkom-backend.herokuapp.com";
import { Alert } from "react-native";
export default function useHandleConfirmation(products, token, setConfirmed) {
  let done = 0;

  // To get unique values from an obj
  let uniqueItems = Array.from(
    products
      .reduce((map, obj) => {
        // if the code come again it will replace the old value
        return map.set(obj.productCode, obj);
      }, new Map())
      .values()
  );

  uniqueItems.forEach((item) => {
    const { productCode, quantity } = item;

    let howManyToDeduct = products.filter(
      (item) => item.productCode === productCode
    );

    const newQuantity = quantity - howManyToDeduct.length;

    try {
      fetch(`${myURL}/sellProduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          barCode: productCode,
          newQuantity,
          newQuantitySold: howManyToDeduct.length,
        }),
      }).then((result) => {
        result.json().then((final) => {
          console.log(final);
          done++;
          // To check if the product available before selling
          if (final.response == "No enough quantity in the inventory!") {
            return Alert.alert(
              "Error",
              " One of the products is empty in your inventory",
              [
                {
                  text: "Close",
                },
              ]
            );
          }
          done === uniqueItems.length ? setConfirmed(true) : null;
        });
      });
    } catch (error) {
      console.error(error);
    }
  });
}
