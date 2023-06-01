import React from "react";

const CartContext = React.createContext({
  cartData: [],
  totalAmount: 0,
  addItemHandler: (id) => {},
  removeItemHandler: (id) => {},
});

export default CartContext;
