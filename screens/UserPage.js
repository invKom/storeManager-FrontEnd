import React, { useContext, useEffect } from "react";
import { View, Button, StyleSheet, SafeAreaView } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { color } from "styled-system";

import { myContext } from "../Context/myContext";

const UserPage = ({ navigation }) => {
  const { token, setToken, user } = useContext(myContext);
  const handleLogout = () => {
    setToken("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Avatar.Image
            source={{
              uri: "https://api.adorable.io/avatars/80/abott@adorable.png",
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
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="chart-line" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Selling Statement</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => {}}>
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
  // container: {
  //   backgroundColor: "#000000",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   height: "100%",
  // },

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
});

export default UserPage;
