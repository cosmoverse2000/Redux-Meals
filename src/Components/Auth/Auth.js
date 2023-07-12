import React, { useContext, useState } from "react";
import classes from "./Auth.module.css";

import Modal from "../UI/Modal/Modal";

import CartContext from "../../Context/CartContext";
import useFetch from "../../hooks/use-fetch";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const Auth = (props) => {
  const cartCtx = useContext(CartContext);
  // const { isLoading, error, fetchDataReg } = useFetch();
  const { isLoading, error, fetchData } = useFetch();
  const {
    isLoading: isLoadingReg,
    error: errorReg,
    fetchData: fetchDataReg,
  } = useFetch();

  const [orderSuccess, setOrderSuccess] = useState(false);

  const loginSubmitHandler = (userData) => {
    const applyDataFunc = (data) => {
      // console.log(data);
      let emailFound = false;
      if (data) {
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const element = data[key];
            if (element.user.email === userData.email) {
              emailFound = true;
              if (element.user.pass === userData.pass) {
                setOrderSuccess(true);

                localStorage.setItem("loginId", key);

                cartCtx.replaceCart({
                  cartData: element.cartState.cartData || [],
                  totalAmount: element.cartState.totalAmount,
                  userData: {
                    name: element.user.name,
                    contact: element.user.contact,
                    address: element.user.address,
                    pinCode: element.user.pinCode,
                  },
                  isLogged: true,
                });
                // cartCtx.loginHandler("LOGIN");
                props.toggleCart();
                return;
              } else {
                console.log("PASSWORD INCORRECT !!");
                return;
              }
            }
          }
        }

        if (!emailFound) {
          console.log("EMAIL NOT REGESTIRED !!");
        }
      }
    };
    const httpData = {
      url: process.env.REACT_APP_FIREBASEAPI + "/users.json",
    };

    fetchData(httpData, applyDataFunc);
  };

  const registerSubmitHandler = (userData) => {
    // console.log(cartCtx.isLogged, {
    //   userData,
    // });

    const applyDataFunc = (data) => {
      console.log(data);
      if (data) {
        // localStorage.setItem("loginId", data.name);
        setOrderSuccess(true);
      }
    };
    const httpData = {
      url: process.env.REACT_APP_FIREBASEAPI + "/users.json",
      method: "POST",
      body: { user: userData },
      headers: {
        "content-type": "application/json",
      },
    };
    fetchDataReg(httpData, applyDataFunc);
  };

  ////// BEFOR CONFIRM CLICK -CART CONTENT

  let cartContent = (
    <div className={classes.cart}>
      <div className={classes.cartHead}>
        <h1>{props.authType === "register" ? "Register" : "Login"}</h1>
        <p>
          <i>to ReduxMeals.co</i>
        </p>
      </div>
      {props.authType === "register" ? (
        <RegisterForm onConfirm={registerSubmitHandler} />
      ) : (
        <LoginForm onConfirm={loginSubmitHandler} />
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
    console.log(error);
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

export default Auth;
