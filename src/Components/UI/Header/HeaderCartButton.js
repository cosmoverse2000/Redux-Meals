import React from "react";
import CartIcon from "./CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  return (
    <button
      className={`${classes.button} ${props.isAnimate && classes.bump}`}
      onClick={props.showCart}
    >
      <div className={classes.icon}>
        <CartIcon />
      </div>
      Your Cart
      <div className={classes.badge}>{props.totalCartItems}</div>
    </button>
  );
};

export default HeaderCartButton;
