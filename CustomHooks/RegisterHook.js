"use strict";
const myURL = "https://invkom-backend.herokuapp.com";

async function useRegister(values, navigation) {
  const { Email, Password, userName } = values;
  try {
    const response = await fetch(`${myURL}/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: Email,
        password: Password,
        userName: userName,
      }),
    });
    const toJson = await response.json();

    console.log(toJson);

    navigation.navigate("Login");
  } catch (error) {
    console.error(error);
  }
}
module.exports = useRegister;
