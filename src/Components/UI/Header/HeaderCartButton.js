import React, { useState, useContext, useEffect } from "react";
import CartIcon from "./CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../../Context/CartContext";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const { cartData } = cartCtx;

  const [isAnimate, setIsAnimate] = useState(false);

  useEffect(() => {
    if (cartData.length === 0) {
      return;
    }
    setIsAnimate(true);

    const timer = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartData]);

  const totalCartItems = cartData.reduce((totalCount, item) => {
    return totalCount + item.mealCount;
  }, 0);

  return (
    <button
      className={`${classes.button} ${isAnimate && classes.bump}`}
      onClick={props.toggleCart}
    >
      <div className={classes.icon}>
        <CartIcon />
      </div>
      Your Cart
      <div className={classes.badge}>{totalCartItems}</div>
    </button>
  );
};

export default HeaderCartButton;
