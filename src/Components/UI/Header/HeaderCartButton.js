import React, { useState, useContext, useEffect } from "react";
import CartIcon, {
  RegisterIcon,
  LoginIcon,
  LogoutIcon,
  OrdersIcon,
} from "./CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../../Context/CartContext";
import useFetch from "../../../hooks/use-fetch";

let sessionStart = true;
const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const { cartData, isLogged, userData } = cartCtx;

  const [isAnimate, setIsAnimate] = useState(false);

  //// FUNCTION TO SEND CARTDATA TO BACKEND  ON EACH CARTSTATE CHANGE
  const { isLoading, error, fetchData } = useFetch();

  useEffect(() => {
    // if (cartData.length === 0) {
    //   return;
    // }

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
            cartData: cartCtx.cartData,
            totalAmount: cartCtx.totalAmount,
          },
          headers: {
            "content-type": "application/json",
          },
        };
        fetchData(httpData, applyDataFunc);
      }
    };

    setIsAnimate(true);

    const timer = setTimeout(() => {
      setIsAnimate(false);
      updateCartDataAtDB();
    }, 300);

    sessionStart = false;
    return () => {
      clearTimeout(timer);
    };
    ///EXECUTING FUNC
  }, [fetchData, cartCtx.cartData, cartCtx.totalAmount, isLogged]);

  const totalCartItems = cartData.reduce((totalCount, item) => {
    return totalCount + item.mealCount;
  }, 0);

  const content1 = (
    <>
      <button
        className={`${classes.button} ${classes.buttonleft} ${
          isAnimate && classes.bump
        }`}
        onClick={() => {
          props.toggleHandler.toggleAuth();
          props.toggleHandler.setAuth("register");
        }}
      >
        <div className={classes.icon}>
          <RegisterIcon />
        </div>
        Register
      </button>
      <button
        className={`${classes.button} ${classes.buttonright} ${
          isAnimate && classes.bump
        }`}
        onClick={() => {
          props.toggleHandler.toggleAuth();
          props.toggleHandler.setAuth("login");
        }}
      >
        <div className={classes.icon}>
          <LoginIcon />
        </div>
        Login
      </button>
    </>
  );

  const content2 = (
    <>
      <button
        className={`${classes.button} ${classes.buttonleft} ${
          isAnimate && classes.bump
        }`}
        onClick={() => {
          cartCtx.loginHandler("LOGOUT");
          localStorage.removeItem("loginId");
        }}
      >
        <div className={classes.icon}>
          <LogoutIcon />
        </div>
        Logout
      </button>
      <button
        className={`${classes.button} ${classes.buttonmid} ${
          isAnimate && classes.bump
        }`}
        onClick={props.toggleHandler.toggleOrders}
      >
        <div className={classes.icon}>
          <OrdersIcon />
        </div>
        {`Welcome, ${userData.name && userData.name.slice(0, 4)}..!`}
      </button>

      <button
        className={`${classes.button} ${classes.buttonright} ${
          isAnimate && classes.bump
        }`}
        onClick={props.toggleHandler.toggleCart}
      >
        <div className={classes.icon}>
          <CartIcon />
        </div>
        Your Cart
        <div className={classes.badge}>{totalCartItems}</div>
      </button>
    </>
  );
  // console.log("isLogged", isLogged);

  return <div>{isLogged ? content2 : content1}</div>;
};

export default HeaderCartButton;
