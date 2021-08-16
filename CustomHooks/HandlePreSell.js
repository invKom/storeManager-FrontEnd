const myURL = "https://invkom-backend.herokuapp.com";
import { Alert } from "react-native";

async function usePreSell(code, myToken, products, setProducts, invStatement) {
  try {
    const response = await fetch(`${myURL}/pre-sell`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${myToken}`,
      },
      body: JSON.stringify({
        barCode: code,
      }),
    });
    const toJson = await response.json();

    if (toJson.length) {
      if (toJson[0].quantity === 0) {
        return Alert.alert("Error", "Not Enough in the inventory!", [
          { text: "Close" },
        ]);
      } else {
        // let uniqueValues = products.filter(
        //   (item) => item._id === toJson[0]._id
        // );
        // if (uniqueValues.length !== 1) {

        // To Handle adding many products according to there availability
        let alreadyShown = products.filter((item) => {
          return item.productCode === code;
        });

        let HowManyAvailable = invStatement.filter((item) => {
          return item.productCode === code;
        });

        if (alreadyShown.length === HowManyAvailable[0].quantity) {
          Alert.alert("Oops", "All quantity available used !", [
            {
              text: "Close",
            },
          ]);
        } else {
          setProducts([...products, toJson[0]]);
        }

        // } else {
        //   let productToEdit = products.find(
        //     (item) => item._id === uniqueValues[0]._id
        //   );
        //   console.log("Product to edit", productToEdit);
        // }
      }
    } else {
      Alert.alert("Error", "Product not in your Inventory !", [
        {
          text: "Close",
        },
      ]);
    }
  } catch (error) {
    console.error(error);
  }
}

export default usePreSell;
