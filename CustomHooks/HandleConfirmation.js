const myURL = "https://invkom-backend.herokuapp.com";
import { Alert } from "react-native";
export default function useHandleConfirmation(products, token, setConfirmed) {
  let done = 0;

  products.forEach((item) => {
    const { productCode } = item;
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
          done === products.length ? setConfirmed(true) : null;
        });
      });
    } catch (error) {
      console.error(error);
    }
  });
}
