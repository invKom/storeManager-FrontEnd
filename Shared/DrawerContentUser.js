import React from "react";
import { View, StyleSheet } from "react-native";
import { Title, Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function DrawerContentUser(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 40 }}>
              <Icon name="store-outline" size={50} />
              <Title style={styles.title}> InvKom</Title>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-circle" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate("UserPage");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="plus-thick" color={color} size={size} />
              )}
              label="Add Product"
              onPress={() => {
                props.navigation.navigate("AddProduct");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="barcode-scan" color={color} size={size} />
              )}
              label="Scan Code"
              onPress={() => {
                props.navigation.navigate("Scanning");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="cash-multiple" color={color} size={size} />
              )}
              label="Sell"
              onPress={() => {
                props.navigation.navigate("SellingPage");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: "#ebe6e6",
    height: "100%",
  },
  userInfoSection: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    marginTop: 3,
    fontWeight: "bold",
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
});
