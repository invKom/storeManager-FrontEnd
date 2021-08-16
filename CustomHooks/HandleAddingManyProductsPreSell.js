// "use strict";

// import { Alert } from "react-native";

// function useHandleManyProducts(code, products, invStatement) {
//   let alreadyShown = products.filter((item) => {
//     return item.productCode === code;
//   });

//   let HowManyAvailable = invStatement.filter((item) => {
//     return item.productCode === code;
//   });

//   if (alreadyShown.length === HowManyAvailable[0].quantity) {
//     Alert.alert("Oops", "All quantity available used !", [
//       {
//         text: "Close",
//       },
//     ]);
//   }else {
//       setProducts([])
//   }
// }
