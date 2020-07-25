import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.sum}>${props.amount.toFixed(2)}</Text>
        {props.deletable && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={props.onRemove}
          >
            <Ionicons name="md-trash" size={23} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: 20,
  },
  itemData: { flexDirection: "row", alignItems: "center" },
  quantity: {
    color: "#888",
    fontFamily: "open-sans",
    fontSize: 16,
  },
  title: { fontFamily: "open-sans-bold", fontSize: 16 },
  sum: { fontFamily: "open-sans-bold", fontSize: 16 },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
