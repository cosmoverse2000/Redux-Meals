import React, { useReducer } from "react";
import CartContext from "./CartContext";

const cartStateReducer = (state, action) => {
  if (action.type === "ADD_MEAL") {
    const updatedTotalAmount =
      state.totalAmount + action.payload.mealPrice * action.payload.mealCount;

    const existingCartItemIndex = state.cartData.findIndex(
      (item) => item.mealId === action.payload.mealId
    );
    const existingCartItem = state.cartData[existingCartItemIndex];

    let updatedCartData = [...state.cartData];

    if (existingCartItem) {
      console.log("addddd");
      const updatedCartItem = {
        ...existingCartItem,
        mealCount: existingCartItem.mealCount + action.payload.mealCount,
      };

      updatedCartData[existingCartItemIndex] = updatedCartItem;
    } else {
      updatedCartData.push(action.payload);
    }
    return { cartData: updatedCartData, totalAmount: updatedTotalAmount };
  }

  if (action.type === "REMOVE_MEAL") {
    const existingCartItemIndex = state.cartData.findIndex(
      (item) => item.mealId === action.payload
    );
    const existingCartItem = state.cartData[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingCartItem.mealPrice;
    let updatedCartData = [...state.cartData];

    if (existingCartItem.mealCount === 1) {
      console.log("removvvv ");
      updatedCartData = state.cartData.filter(
        (each) => each.mealId !== action.payload
      );
    } else {
      const updatedCartItem = {
        ...existingCartItem,
        mealCount: existingCartItem.mealCount - 1,
      };

      updatedCartData[existingCartItemIndex] = updatedCartItem;
    }

    return { cartData: updatedCartData, totalAmount: updatedTotalAmount };
  }
  if (action.type === "CLEAR_CART") {
    return { cartData: [], totalAmount: 0 };
  }
  return { cartData: [], totalAmount: 0 };
};

export const CartProvider = (props) => {
  ////////////////// CART DATA TO BE MANAGED AND TOTAL SUM FOR ORDER
  const [cartState, dispatchCartData] = useReducer(cartStateReducer, {
    cartData: [],
    totalAmount: 0,
  });

  /////////////// FOR HEADER BUTTON TOTAL MEALS ADDED TO CART

  const removeItemHandler = (mealIdToRemov) => {
    dispatchCartData({ type: "REMOVE_MEAL", payload: mealIdToRemov });
  };

  const addItemHandler = (item) => {
    dispatchCartData({ type: "ADD_MEAL", payload: item });
    //   const limitItems =
    //     mealObj.mealCount + item.mealCount > 20
    //       ? 20 - mealObj.mealCount
    //       : item.mealCount;
  };
  const clearCart = () => {
    dispatchCartData({ type: "CLEAR_CART" });
  };
  console.log("CartPro");

  return (
    <CartContext.Provider
      value={{
        cartData: cartState.cartData,
        totalAmount: cartState.totalAmount,
        addItemHandler: addItemHandler,
        removeItemHandler: removeItemHandler,
        clearCart: clearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
