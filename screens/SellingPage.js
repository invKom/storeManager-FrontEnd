import React, { useContext, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Button, FlatList } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { myContext } from "../Context/myContext";

export default function SellingPage({ navigation }) {
  const {
    hasPermission,
    setHasPermission,
    scanned,
    setScanned,
    sellingCode,
    setSellingCode,
    products,
    setProducts,
  } = useContext(myContext);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // This to prevent useEffect from rendering at the initial render
  const initialRender = useRef(true);

  // Request Camera Permission
  useEffect(() => {
    setProducts([]);
    askForCameraPermission();
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      setProducts([...products, sellingCode]);
    }
  }, [sellingCode]);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setSellingCode(data);
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
        //   keyExtractor={(item)=> item._id}
        data={products}
        renderItem={({ item }) => <Text style={styles.maintext}>{item}</Text>}
      />

      {scanned && (
        <Button
          title={"Scan again?"}
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 15,
    margin: 1,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
});
