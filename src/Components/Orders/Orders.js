import React, { useContext, useState, useEffect } from "react";
import classes from "./Orders.module.css";

import Modal from "../UI/Modal/Modal";

import CartContext from "../../Context/CartContext";
import useFetch from "../../hooks/use-fetch";
import OrderItem from "./OrderItem";

const Orders = (props) => {
  const cartCtx = useContext(CartContext);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const { isLoading, error, fetchData } = useFetch();
  const [orderedData, setOrderedData] = useState([]);

  const ApplyDataFunc = (data) => {
    const orderedMeals = [];
    for (const key in data) {
      orderedMeals.push({
        orderId: key,
        time: data[key].orderDetails.dateTime,
        orderDetails: data[key].orderDetails,
        orderedItems: data[key].orderedItems,
      });
    }

    setOrderedData(orderedMeals);
  };

  useEffect(() => {
    const loginId = localStorage.getItem("loginId");
    fetchData(
      {
        url:
          process.env.REACT_APP_FIREBASEAPI + `/users/${loginId}/orders.json`,
      },
      ApplyDataFunc
    );
  }, [fetchData]);

  ////// FEEDBACK AND CARTITEMS

  ////// BEFOR CONFIRM CLICK -CART CONTENT

  let cartContent = (
    <div className={classes.cart}>
      <div className={classes.cartHead}>
        <h1>
          Welcome, <u>{cartCtx.userData.name && cartCtx.userData.name}</u> !
        </h1>
        <p>
          <i>to ReduxMeals.co</i>
        </p>
        <h3>
          {orderedData.length === 0
            ? "No orders found, ORDER NOW !!!"
            : "YOUR ORDER`S LIST :"}
        </h3>
      </div>

      <div className={classes.orders}>
        <ul className={classes["cart-items"]}>
          {orderedData.map((item, index) => {
            ///cartData is array of objects(having  meal price,amount, count & id)
            return (
              <OrderItem
                key={item.orderId}
                index={index + 1}
                orderId={item.orderId}
                time={item.time}
                orderDetails={item.orderDetails}
                orderedItems={item.orderedItems}
              />
            );
          })}
        </ul>
      </div>

      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.toggleCart}>
          Close
        </button>
      </div>
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

export default Orders;
