import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Input, Button, Center, NativeBaseProvider } from "native-base";
export const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleShowPass = () => setShow(!show);

  return (
    <>
      <NativeBaseProvider>
        <View style={myStyles.container}>
          <Input
            style={myStyles.input}
            type="text"
            placeholder="Email"
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
          />

          <Input
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
            style={myStyles.input}
            type={show ? "text" : "password"}
            InputRightElement={
              <Button
                ml={1}
                roundedLeft={0}
                roundedRight="md"
                onPress={handleShowPass}
              >
                {show ? "Hide" : "Show"}
              </Button>
            }
            placeholder="Password"
          />

          <Button onPress={() => Alert.alert("Login")}> Login </Button>
        </View>
      </NativeBaseProvider>
    </>
  );
};

export default Login;

const myStyles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: "#ffff",
  },
  input: {
    color: "#ffff",
    marginBottom: "3%",
    width: "70%",
  },
});
