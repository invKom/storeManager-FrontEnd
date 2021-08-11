import React, { useContext, useEffect } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { myContext } from "../Context/myContext";

const UserPage = ({ navigation }) => {
  const { token } = useContext(myContext);
  const handleSellingPage = () => {
    navigation.navigate("SellingPage");
  };

  return !token ? (
    <View style={styles.container}>
      <Text> You have to be Logged in !</Text>
      <Button title="Login" onPress={()=> navigation.navigate("Login")} />
    </View>
  ) : (
    <View style={styles.container}>
      <Button title="SellingPage" onPress={handleSellingPage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default UserPage;
