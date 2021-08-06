"use strict";
const myURL = "https://invkom-backend.herokuapp.com";

async function useLogin(values, navigation, token, setToken, error, setError) {
  const { Email, Password } = values;
  try {
    const response = await fetch(`${myURL}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: Email,
        password: Password,
      }),
    });
    const toJson = await response.json();

    setToken(toJson.response.token);
    console.log(toJson.response);
    // navigation.navigate("");
  } catch (error) {
    console.error(error);
    setError("Incorrect Email or Password");
  }
}

module.exports = useLogin;
