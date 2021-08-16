const myURL = "https://invkom-backend.herokuapp.com";
import { Alert } from "react-native";
export default function useHandleConfirmation(products, token, setConfirmed) {
  let done = 0;

  products.forEach(async (item) => {
    const { productCode } = item;
    try {
      const response = await fetch(`${myURL}/sellProduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          barCode: productCode,
        }),
      });
      const toJson = await response.json();
      console.log(toJson);
      done++;
      // To check if the product available before selling
      if (toJson.response == "No enough quantity in the inventory!") {
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
    } catch (error) {
      console.error(error);
    }

    done === products.length ? setConfirmed(true) : null;
  });
}
