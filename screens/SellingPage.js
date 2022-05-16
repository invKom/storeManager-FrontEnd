import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useContext, useEffect, useRef } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";
import uuid from "react-native-uuid";
import { myContext } from "../Context/myContext";
import useHandleConfirmation from "../CustomHooks/HandleConfirmation";
import usePreSell from "../CustomHooks/HandlePreSell";
import useInvStatement from "../CustomHooks/InvStatementHook";
import useSellingStatement from "../CustomHooks/SellingStatementHook";



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

  // This to prevent useEffect from rendering at the initial render
  const initialRender = useRef(true);

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      Alert.alert("Alert", "Selling done successfully", [
        {
          text: "Close",
        },
      ]);
      setProducts([]);
      useInvStatement(token, setInvStatement);
      useSellingStatement(token, setSellingStatement);
      initialRender.current = true;
      setConfirmed(false);
    }
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
    useHandleConfirmation(products, token, setConfirmed);
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
      <View style={styles.itemToSell}>
        <FlatList
          data={products}
          keyExtractor={() => uuid.v4()}
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
      </View>

      <Text style={styles.total}> Total: {totalPrice}$ </Text>
      <View style={styles.buttons}>
        <Button
          title="Confirm Selling"
          onPress={handleConfirmation}
          color="blue"
        />

        {scanned && (
          <Button
            title={"Scan next product"}
            onPress={() => setScanned(false)}
            color="tomato"
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
  itemToSell: {
    flex: 1,
    flexDirection: "column",
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
    height: "20%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "tomato",
    borderTopWidth: 2,
  },
});
