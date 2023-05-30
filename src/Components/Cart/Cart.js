import React from "react";
import classes from "./Cart.module.css";

import CartItem from "./CartItem";
import Modal from "../UI/Modal/Modal";
import mealsData from "../../Data/dummy-meals";

const Cart = (props) => {
  return (
    <Modal onBackdropClick={props.setShowCartFalse}>
      <div className={classes["cart-items"]}>
        {props.cartData.map((each) => {
          const mealData = mealsData.filter((each1) => {
            return each1.id === each.mealId;
          })[0];
          return (
            <CartItem
              key={each.mealId}
              mealId={each.mealId}
              price={mealData.price}
              name={mealData.name}
              amount={each.mealCount}
              onRemove={props.removeItemHandler}
              onAdd={props.addItemHandler}
            />
          );
        })}

        <div className={classes.total}>
          <div>Total Amount</div>
          <div>${props.totalAmount.toFixed(2)}</div>
        </div>
        <div className={classes.actions}>
          <button
            className={classes["button--alt"]}
            onClick={props.setShowCartFalse}
          >
            Close
          </button>
          <button className={classes.button}>Order</button>
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
