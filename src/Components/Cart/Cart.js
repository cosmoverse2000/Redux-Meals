import React, { useContext } from "react";
import classes from "./Cart.module.css";

import CartItem from "./CartItem";
import Modal from "../UI/Modal/Modal";

import CartContext from "../../Context/CartContext";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

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

  return (
    <Modal onBackdropClick={props.toggleCart}>
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
          <button className={classes.button}>Order</button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
