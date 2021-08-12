import React, { useContext, useEffect } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { myContext } from "../Context/myContext";

const UserPage = ({ navigation }) => {
  const { token, setToken, user } = useContext(myContext);
  const handleLogout = () => {
    setToken("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Welcome to your profile {user.userName}</Text>

      <Button title="Logout" onPress={handleLogout} />

      <Button title="Selling Status" />

      <Button title="Inventory Status" />
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

  title: {
    color: "#ffff",
    textAlign: "center",
    fontSize: 25,
    marginBottom: 10,
  },
});

export default UserPage;
