import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useContext, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { myContext } from "../Context/myContext";

export default function ScanningPage({ navigation }) {
  const {
    hasPermission,
    setHasPermission,
    scanned,
    setScanned,
    text,
    setText,
  } = useContext(myContext);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setText(data);
    setScanned(true);
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
      <Text style={styles.maintext}>
        {" "}
        Copy the code and paste it in the add product form
      </Text>
      <TextInput value={text} style={styles.input} />

      <View style={styles.buttons}>
        {scanned && (
          <Button
            style={styles.btn1}
            title={"Scan again?"}
            onPress={() => setScanned(false)}
            color="tomato"
          />
        )}

        <Button
          style={styles.btn2}
          title="Add Product"
          onPress={() => navigation.navigate("AddProduct")}
          color="blue"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
  },
  maintext: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    color: "#ffff",
    textAlign: "center",
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
    marginTop: 5,
    maxHeight: 35,
  },
  input: {
    textDecorationColor: "#ffff",
    color: "#ffff",
    marginBottom: 3,
    width: 250,
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ffff",
  },
  btn2: {
    marginLeft: 2,
  },
  btn1: {
    marginRight: 2,
  },
});
