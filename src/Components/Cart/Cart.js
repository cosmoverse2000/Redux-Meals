import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";

import CartItem from "./CartItem";
import Modal from "../UI/Modal/Modal";

import CartContext from "../../Context/CartContext";
import useFetch from "../../hooks/use-fetch";
import ChekoutForm from "./ChekoutForm";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const { isLoading, error, fetchData } = useFetch();
  const [showForm, setShowForm] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const applyDataFunc = (data) => {
    console.log(data);
    if (data) {
      setOrderSuccess(true);
    }
  };
  const submitHandler = (userData) => {
    console.log({
      orderedItems: cartCtx.cartData,
      user: userData,
    });

    const httpData = {
      url: "https://react-http-db9a9-default-rtdb.firebaseio.com/orders.json",
      method: "POST",
      body: {
        orderedItems: cartCtx.cartData,
        user: userData,
      },
      headers: {
        "content-type": "application/json",
      },
    };

    fetchData(httpData, applyDataFunc);
  };

  ////// FEEDBACK AND CARTITEMS
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.cartData.map((item) => {
        ///cartData is array of objects(having  meal price,amount, count & id)
        return (
          <CartItem
            key={item.mealId}
            name={item.mealName}
            price={item.mealPrice}
            amount={item.mealCount}
            onRemove={cartCtx.removeItemHandler.bind(null, item.mealId)}
            onAdd={cartCtx.addItemHandler.bind(null, { ...item, mealCount: 1 })}
          />
        );
      })}
    </ul>
  );
  ////// BEFOR CONFIRM CLICK -CART CONTENT

  let cartContent = (
    <div className={classes.cart}>
      {cartItems}

      <div className={classes.total}>
        <div>Total Amount</div>
        <div>${cartCtx.totalAmount.toFixed(2)}</div>
      </div>

      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.toggleCart}>
          Close
        </button>
        {cartCtx.cartData.length > 0 && (
          <button
            className={classes.button}
            onClick={() => {
              setShowForm(true);
            }}
          >
            Order
          </button>
        )}
      </div>
      {cartCtx.cartData.length > 0 && showForm && (
        <ChekoutForm onConfirm={submitHandler} />
      )}
    </div>
  );

  ////// AFTER CONFIRM CLICK -FEEDBACK CONTENT
  if (isLoading) {
    cartContent = (
      <div className={classes.actions}>
        <h3>Wait! your order in queue ... </h3>
        <button className={classes.button} disabled={true}>
          Confirming....
        </button>
      </div>
    );
  }

  if (!isLoading && error) {
    cartContent = (
      <div className={classes.actions}>
        <h3>Sorry! your order in failed. Something wrong. </h3>
        <button className={classes.button} onClick={props.toggleCart}>
          Try Again
        </button>
      </div>
    );
  }

  if (!isLoading && orderSuccess) {
    cartContent = (
      <div className={classes.actions}>
        <h3>Buyaah! Your order has been placed successfully 🤝. </h3>
        <button
          className={classes.button}
          onClick={() => {
            props.toggleCart();
            cartCtx.clearCart();
          }}
        >
          Close
        </button>
      </div>
    );
  }

  console.log("CART RENDERED");

  return <Modal onBackdropClick={props.toggleCart}>{cartContent}</Modal>;
};

export default Cart;
