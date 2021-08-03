import React from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  Alert,
  SafeAreaView,
} from "react-native";

const Separator = () => <View style={styles.separator} />;

const HomePage = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.intro}>
        <Text style={styles.header}> InvKom </Text>
      </View>

      <Separator />
      <View style={styles.btn}>
        <Text style={styles.title}>
          In order to proceed you have to be logged-in
        </Text>
        <Button title="Login" onPress={handleLogin} />
        <Separator />

        <Button
          title="Register"
          onPress={() => Alert.alert("Simple Button pressed")}
        />
      </View>
    </SafeAreaView>
  );
};
export default HomePage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  intro: {
    alignItems: "center",
    marginBottom: 90,
  },
  header: {
    color: "#ffff",
    fontSize: 40,
    marginVertical: 10,
  },
  title: {
    color: "#ffff",
    textAlign: "center",
    marginBottom: 40,
  },

  btn: {
    width: "50%",
  },

  separator: {
    marginVertical: 20,
    borderBottomColor: "#ffff",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
