import React from "react";
import classes from "./Cart.module.css";

import CartItem from "./CartItem";
import Modal from "../UI/Modal/Modal";

const Cart = (props) => {
  const removeHandler = () => {};
  return (
    <Modal>
      <div className={classes["cart-items"]}>
        <CartItem
          price={22.99}
          name={"Shushi"}
          amount={2}
          onRemove={removeHandler}
          onAdd={removeHandler}
        />
        <div className={classes.total}>
          <div>Total Amount</div>
          <div>$33.00</div>
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
