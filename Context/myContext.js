import React, { createContext, useState } from "react";
export const myContext = createContext();

export default function ContextProvider(props) {
  // To handle login
  const [token, setToken] = useState("");
  const [error, setError] = useState(null);

  // To handle code scanning
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");

  let allState = {
    token,
    setToken,
    error,
    setError,
    hasPermission,
    setHasPermission,
    scanned,
    setScanned,
    text,
    setText,
  };

  return (
    <myContext.Provider value={allState}>{props.children}</myContext.Provider>
  );
}
