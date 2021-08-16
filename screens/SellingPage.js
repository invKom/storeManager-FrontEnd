import React, { useContext, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Button, FlatList, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { myContext } from "../Context/myContext";
import useHandleConfirmation from "../CustomHooks/HandleConfirmation";
import { borderTop } from "styled-system";

import useInvStatement from "../CustomHooks/InvStatementHook";
import useSellingStatement from "../CustomHooks/SellingStatementHook";
import usePreSell from "../CustomHooks/HandlePreSell";

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
    confirmed,
    setConfirmed,
    invStatement,
    setInvStatement,
    setSellingStatement,
  } = useContext(myContext);

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  useEffect(() => {
    setProducts([]);
  }, [confirmed]);

  // calculating total price
  useEffect(() => {
    let total = 0;
    products.forEach((item) => {
      total += item.productPrice;
    });
    setTotalPrice(total);
  }, [products]);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  const handleConfirmation = () => {
    products.forEach((item) => {
      useHandleConfirmation(item, token, setConfirmed);
    });

    if (confirmed) {
      Alert.alert("Alert", "Selling done successfully", [
        {
          text: "Close",
        },
      ]);

      setProducts([]);
      useInvStatement(token, setInvStatement);
      useSellingStatement(token, setSellingStatement);
    }
  };

  const handleRemoveFromPreSell = (id) => {
    const removeItem = products.filter((item) => item._id !== id);
    setProducts([...removeItem]);
  };

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    // fetching data from the back-end
    usePreSell(data, token, products, setProducts, invStatement);
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
        // id duplicated !!
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.maintext}>
              Product: {item.productName} | Price: {item.productPrice}$
            </Text>

            {/* Delete all related @ _ @ */}
            <Button
              title="X"
              onPress={() => handleRemoveFromPreSell(item._id)}
            />
          </View>
        )}
      />

      <Text style={styles.total}> Total: {totalPrice}$ </Text>
      <View style={styles.buttons}>
        <Button
          title="Confirm Selling"
          onPress={handleConfirmation}
          color="blue"
          style={styles.btn1}
        />

        {scanned && (
          <Button
            title={"Scan next product"}
            onPress={() => setScanned(false)}
            color="tomato"
            style={styles.btn2}
          />
        )}
      </View>
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
  buttons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "tomato",
    borderTopWidth: 2,
  },

  btn2: {
    marginLeft: 2,
  },
  btn1: {
    marginRight: 2,
  },
});
