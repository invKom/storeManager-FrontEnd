import { Formik } from "formik";
import React, { useContext, useEffect } from "react";
import {
  Button, FlatList, Keyboard, Modal, SafeAreaView, StyleSheet, TextInput,
  TouchableWithoutFeedback, View
} from "react-native";
import {
  Avatar, Caption,
  Text, Title, TouchableRipple
} from "react-native-paper";
import uuid from "react-native-uuid";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { myContext } from "../Context/myContext";
import useEditQuantity from "../CustomHooks/EditProductQuantity";
import useInvStatement from "../CustomHooks/InvStatementHook";
import useSellingStatement from "../CustomHooks/SellingStatementHook";




const UserPage = ({ navigation }) => {
  const {
    token,
    setToken,
    user,
    toggleModal,
    setToggleModal,
    toggleModalSelling,
    setToggleModalSelling,
    invStatement,
    setInvStatement,
    sellingStatement,
    setSellingStatement,
    mainMissingItems,
    setMainMissingItems,
    mainTotalSelling,
    setMainTotalSelling,
  } = useContext(myContext);

  const handleLogout = () => {
    setToken("");
  };

  useEffect(() => {
    useInvStatement(token, setInvStatement);
    useSellingStatement(token, setSellingStatement);
  }, []);

  useEffect(() => {
    let missingCount = 0;
    invStatement.forEach((item) =>
      item.quantity === 0 ? missingCount++ : missingCount
    );
    setMainMissingItems(missingCount);
  }, [invStatement]);

  useEffect(() => {
    let sellingCount = 0;
    sellingStatement.forEach((item) => {
      sellingCount += parseInt(item.productPrice) * parseInt(item.quantitySold);
    });
    setMainTotalSelling(sellingCount);
  }, [sellingStatement]);

  const handleInventoryStatement = () => {
    useInvStatement(token, setInvStatement);
    setToggleModal(true);
  };

  const handleSellingStatement = () => {
    useSellingStatement(token, setSellingStatement);
    setToggleModalSelling(true);
  };

  const handleCloseModal = () => {
    setToggleModal(false);
    setToggleModalSelling(false);
  };

  const handleEditQuantity = (values) => {
    useEditQuantity(values, token, setToggleModal);

    useInvStatement(token, setInvStatement);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Avatar.Image
            source={{
              uri: "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {user.userName}
            </Title>
            <Caption style={styles.caption}>@InvKom/{user.userName}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="email" color="#ededed" size={20} />
          <Text style={{ color: "#ededed", marginLeft: 5 }}>{user.email}</Text>
        </View>
      </View>

      <Modal visible={toggleModal} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modal}>
            <FlatList
              data={invStatement}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={styles.invItems}>
                  <Formik
                    initialValues={{
                      quantity: `${item.quantity}`,
                      productCode: item.productCode,
                    }}
                    onSubmit={handleEditQuantity}
                  >
                    {(formikProps) => (
                      <>
                        <Text style={styles.txt}>
                          Product: {item.productName}
                          {"\n"}
                          Description: {item.description}
                          {"\n"}
                          Price: {item.productPrice}${"\n"}
                        </Text>

                        <Text style={styles.txt}>Product Code</Text>
                        <TextInput
                          style={styles.input}
                          onChangeText={formikProps.handleChange("productCode")}
                          value={formikProps.values.productCode}
                        />
                        <Text style={styles.txt}>Quantity</Text>
                        <TextInput
                          style={styles.input}
                          onChangeText={formikProps.handleChange("quantity")}
                          value={formikProps.values.quantity}
                          keyboardType="number-pad"
                        />
                        <Text>{"\n"}</Text>
                        <Button
                          title="Edit Quantity"
                          onPress={formikProps.handleSubmit}
                        />
                      </>
                    )}
                  </Formik>
                </View>
              )}
            />

            <Button
              onPress={handleCloseModal}
              title="Close"
              color="tomato"
              style={{ marginBottom: 5, marginTop: 5 }}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={toggleModalSelling} animationType="slide">
        <View style={styles.modal}>
          <FlatList
            data={sellingStatement}
            keyExtractor={() => uuid.v4()}
            renderItem={({ item }) => (
              <>
                <Text style={styles.invItems}>
                  Product: {item.productName} | Quantity Sold:{" "}
                  {item.quantitySold} {"\n"}
                  Date/Time Sold: {item.dateSold}/{item.timeSold}
                  {"\n"}
                  Price: {item.productPrice}$
                </Text>
              </>
            )}
          />

          <Button
            onPress={handleCloseModal}
            title="Close"
            color="tomato"
            style={{ marginBottom: 5, marginTop: 5 }}
          />
        </View>
      </Modal>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title style={{ color: "#ededed" }}>{mainTotalSelling}$</Title>
          <Caption style={{ color: "#ededed" }}>Total Sales</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title style={{ color: "#FF6347" }}>{mainMissingItems}</Title>
          <Caption style={{ color: "#ededed" }}>Items Missing</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={handleSellingStatement}>
          <View style={styles.menuItem}>
            <Icon name="chart-line" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Selling Statement</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={handleInventoryStatement}>
          <View style={styles.menuItem}>
            <Icon name="storefront-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Manage Inventory</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="cog" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={handleLogout}>
          <View style={styles.menuItem}>
            <Icon name="logout" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Logout</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    color: "#ededed",
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    color: "#ededed",
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#ededed",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },

  invItems: {
    backgroundColor: "#ebe6e6",
    fontSize: 15,
    color: "#000000",
    textAlign: "center",
    marginVertical: 15,
    padding: 20,
  },

  modal: {
    backgroundColor: "#000000",
    alignItems: "center",
    height: "100%",
  },

  txt: {
    color: "#000000",
    fontSize: 15,
    textAlign: "center",
  },

  input: {
    color: "#000000",
    borderColor: "#000000",
    textAlign: "center",
    borderWidth: 2,
  },
});

export default UserPage;
