import React, { useContext, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Button, FlatList } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { myContext } from "../Context/myContext";

// import usePreSell from "../CustomHooks/PreSellHook";

export default function SellingPage({ navigation }) {
  const {
    hasPermission,
    setHasPermission,
    scanned,
    setScanned,
    token,
    products,
    setProducts,
    totalPrice,
    setTotalPrice,
  } = useContext(myContext);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    setProducts([]);
    askForCameraPermission();
  }, []);

  // calculating total price
  useEffect(() => {
    products.forEach((item) => {
      setTotalPrice((prev) => (prev += item.productPrice));
    });
  }, [products]);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    // fetching data from the back-end
    async function PreSell(code, myToken) {
      const myURL = "https://invkom-backend.herokuapp.com";

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


        // To not add the item twice
        if (toJson.length) {
          let alreadyThere = false;
          products.forEach((obj) => {
            obj._id !== toJson[0]._id
              ? (alreadyThere = false)
              : (alreadyThere = true);
          });

          if (!alreadyThere) {
            setProducts([...products, toJson[0]]);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    PreSell(data, token);
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  // Return the View
  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Text style={styles.maintext}>
            Product: {item.productName} |Price: {item.productPrice}$
          </Text>
        )}
      />

      <Text style={styles.total}> Total: {totalPrice}$ </Text>

      {scanned && (
        <Button
          title={"Scan next product"}
          onPress={() => setScanned(false)}
          color="tomato"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 20,
    margin: 1,
    color: "#ffff",
  },
  total: {
    fontSize: 25,
    color: "#ffff",
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 290,
    width: 350,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
    marginTop: 15,
  },
});
