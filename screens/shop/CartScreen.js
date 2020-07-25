import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import CartItem from "../../components/shop/CartItem";
import Colors from "../../constants/Colors";
import * as cartAction from "../../store/actions/cart";
import * as orderAction from "../../store/actions/orders";

const CartScreen = (props) => {
  const totalPrice = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const { removeItem } = cartAction;
  const { addOrder } = orderAction;

  const cartItems = useSelector((state) => {
    const transformedItems = [];
    for (const key in state.cart.items) {
      transformedItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  return (
    <View style={styles.screen}>
      <View style={styles.flexCont}>
        <Text style={styles.amount}>
          Total:{" "}
          <Text style={styles.price}>
            ${Math.round(totalPrice.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        <View>
          <Button
            disabled={cartItems.length === 0}
            color={Colors.primary}
            title="Order Now"
            onPress={() => {
              dispatch(addOrder(cartItems, totalPrice));
            }}
          />
        </View>
      </View>
      <FlatList
        keyExtractor={(item) => item.productId}
        data={cartItems}
        renderItem={(itemData) => {
          return (
            <CartItem
              deletable={true}
              title={itemData.item.productTitle}
              quantity={itemData.item.quantity}
              amount={itemData.item.sum}
              onRemove={() => {
                dispatch(removeItem(itemData.item.productId));
              }}
            />
          );
        }}
      />
    </View>
  );
};

CartScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Cart",
  };
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  price: {
    color: Colors.primary,
  },
  amount: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
  },
  flexCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 15,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
});

export default CartScreen;
