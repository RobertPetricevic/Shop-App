import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Image
} from "react-native";
import Colors from "../../constants/Colors";
import * as cartAction from "../../store/actions/cart";
import HeaderButton from "../../components/UI/HeaderButton";

const ProductDetailScreen = props => {
  const dispatch = useDispatch();
  const { addToCart } = cartAction;

  const productId = props.navigation.getParam("productId");

  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(item => item.id === productId)
  );

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.button}>
        <Button
          color={Colors.primary}
          title="To Cart"
          onPress={() => {
            dispatch(addToCart(selectedProduct));
          }}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="cart"
          iconName="md-cart"
          onPress={() => {
            navData.navigation.navigate("CartScreen");
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300
  },
  button: {
    marginVertical: 10,
    alignItems: "center"
  },
  price: {
    fontSize: 20,
    color: "#888",
    marginVertical: 10,
    textAlign: "center",
    fontFamily: "open-sans-bold"
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: "open-sans"
  }
});

export default ProductDetailScreen;
