import React, { useContext, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  Modal,
  FlatList,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { color, textAlign } from "styled-system";

import useInvStatement from "../CustomHooks/InvStatementHook";
import useSellingStatement from "../CustomHooks/SellingStatementHook";

import { myContext } from "../Context/myContext";

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
  } = useContext(myContext);
  const handleLogout = () => {
    setToken("");
  };

  const handleInventoryStatement = () => {
    useInvStatement(token, setInvStatement, setToggleModal);
  };

  const handleSellingStatement = () => {
    useSellingStatement(token, setSellingStatement, setToggleModalSelling);
  };

  const handleCloseModal = () => {
    setInvStatement([]);
    setSellingStatement([]);
    setToggleModal(false);
    setToggleModalSelling(false);
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
          <Text style={{ color: "#ededed", marginLeft: 17 }}>{user.email}</Text>
        </View>
      </View>

      <Modal visible={toggleModal} animationType="slide">
        <Button onPress={handleCloseModal} title="X" />
        <View style={styles.modal}>
          <FlatList
            data={invStatement}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Text
                style={item.quantity === 0 ? styles.empty : styles.invItems}
              >
                Product: {item.productName} | Quantity: {item.quantity} | Price:{" "}
                {item.productPrice}$ | Product Code: {item.productCode}
              </Text>
            )}
          />
        </View>
      </Modal>

      <Modal visible={toggleModalSelling} animationType="slide">
        <Button onPress={handleCloseModal} title="X" />
        <View style={styles.modal}>
          <FlatList
            data={sellingStatement}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Text style={styles.invItems}>
                Product: {item.productName} | Quantity Sold: {item.quantitySold}{" "}
                Date and Time Sold: {item.dateSold} {item.timeSold}| Price:{" "}
                {item.productPrice}$
              </Text>
            )}
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
          <Title style={{ color: "#ededed" }}>140.50$</Title>
          <Caption style={{ color: "#ededed" }}>Total Sales</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title style={{ color: "#ededed" }}>5</Title>
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
            <Text style={styles.menuItemText}>Inventory Statement</Text>
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
    marginHorizontal: 3,
    marginVertical: 15,
  },

  empty: {
    backgroundColor: "#b30707",
    fontSize: 15,
    color: "#000000",
    textAlign: "center",
    marginHorizontal: 3,
    marginVertical: 15,
  },

  modal: {
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default UserPage;
