import React, { useReducer, useEffect } from "react";
import CartContext from "./CartContext";
import useFetch from "../hooks/use-fetch";

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
    return {
      cartData: updatedCartData,
      totalAmount: updatedTotalAmount,
      isLogged: state.isLogged,
      userData: state.userData,
    };
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

    return {
      cartData: updatedCartData,
      totalAmount: updatedTotalAmount,
      isLogged: state.isLogged,
      userData: state.userData,
    };
  }
  if (action.type === "CLEAR_CART") {
    return {
      cartData: [],
      totalAmount: 0,
      isLogged: state.isLogged,
      userData: state.userData,
    };
  }
  if (action.type === "LOGIN") {
    return {
      cartData: state.cartData,
      totalAmount: state.totalAmount,
      isLogged: true,
      userData: state.userData,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      cartData: state.cartData,
      totalAmount: state.totalAmount,
      isLogged: false,
      userData: {},
    };
  }
  if (action.type === "REPLACE_CART") {
    return { ...action.payload };
  }
  return {
    isLogged: state.isLogged,
    cartData: [],
    totalAmount: 0,
    userData: state.userData,
  };
};

let sessionStart = true;

export const CartProvider = (props) => {
  ////////////////// CART DATA TO BE MANAGED AND TOTAL SUM FOR ORDER
  const [cartState, dispatchCartData] = useReducer(cartStateReducer, {
    cartData: [],
    totalAmount: 0,
    isLogged: false,
    userData: {},
  });
  //// FUNCTION TO SEND CARTDATA TO BACKEND  ON EACH CARTSTATE CHANGE
  const { isLoading, error, fetchData } = useFetch();

  useEffect(() => {
    //// FUNCTION TO SEND CARTDATA TO BACKEND  ON EACH CARTSTATE CHANGE
    const updateCartDataAtDB = () => {
      const loginId = localStorage.getItem("loginId");
      if (loginId && !sessionStart) {
        const applyDataFunc = (data) => {
          console.log("updateCartDataAtDB", data);
        };
        const httpData = {
          url:
            process.env.REACT_APP_FIREBASEAPI +
            `/users/${loginId}/cartState.json`,
          method: "PUT",
          body: {
            cartData: cartState.cartData,
            totalAmount: cartState.totalAmount,
          },
          headers: {
            "content-type": "application/json",
          },
        };
        fetchData(httpData, applyDataFunc);
      }
    };

    ///EXECUTING FUNC
    updateCartDataAtDB();
    sessionStart = false;
  }, [fetchData, cartState.totalAmount, cartState.cartData]);

  /////////////// FOR HEADER BUTTON TOTAL MEALS ADDED TO CART

  const removeItemHandler = (mealIdToRemov) => {
    dispatchCartData({ type: "REMOVE_MEAL", payload: mealIdToRemov });
  };

  const addItemHandler = (item) => {
    dispatchCartData({ type: "ADD_MEAL", payload: item });

    //////SEND DATA TO DB
  };
  const clearCart = () => {
    dispatchCartData({ type: "CLEAR_CART" });
  };
  const replaceCart = (cartData) => {
    dispatchCartData({ type: "REPLACE_CART", payload: cartData });
  };
  const loginHandler = (type, userData) => {
    dispatchCartData({ type: type, payload: userData });
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
        loginHandler: loginHandler,
        isLogged: cartState.isLogged,
        replaceCart: replaceCart,
        userData: cartState.userData,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
