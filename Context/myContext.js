import React, { createContext, useState } from "react";
export const myContext = createContext();

export default function ContextProvider(props) {
  const [token, setToken] = useState("");
  const [error, setError] = useState(null);

  let allState = {
    token,
    setToken,
    error,
    setError,
  };

  return (
    <myContext.Provider value={allState}>{props.children}</myContext.Provider>
  );
}
