import React, { createContext, useState } from "react";
export const myContext = createContext();

export default function ContextProvider(props) {
  // To handle login
  const [token, setToken] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});

  // To handle code scanning
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");

  // To handle products to sell
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // To handle Modals
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleModalSelling, setToggleModalSelling] = useState(false);
  const [invStatement, setInvStatement] = useState([]);
  const [sellingStatement, setSellingStatement] = useState([]);

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
    products,
    setProducts,
    user,
    setUser,
    totalPrice,
    setTotalPrice,
    toggleModal,
    setToggleModal,
    invStatement,
    setInvStatement,
    sellingStatement,
    setSellingStatement,
    toggleModalSelling,
    setToggleModalSelling,
  };

  return (
    <myContext.Provider value={allState}>{props.children}</myContext.Provider>
  );
}
