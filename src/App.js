import React, { useState } from "react";

import Header from "./Components/UI/Header/Header";
import MealsSummary from "./Components/MealsSummary/MealsSummary";
import AvailableMeals from "./Components/Meals/AvailableMeals";
import Cart from "./Components/Cart/Cart";
import { CartProvider } from "./Context/CartProvider";
import Auth from "./Components/Auth/Auth";
import Orders from "./Components/Orders/Orders";

function App() {
  const [isShowCart, setIsShowCart] = useState(false);
  const [isShowAuth, setIsShowAuth] = useState(false);
  const [isShowOrders, setIsShowOrders] = useState(false);
  const [authType, setAuthType] = useState("login");

  const toggleHandler = {
    toggleCart: () => {
      setIsShowCart((prev) => {
        return !prev;
      });
    },
    toggleAuth: () => {
      setIsShowAuth((prev) => {
        return !prev;
      });
    },
    toggleOrders: () => {
      setIsShowOrders((prev) => {
        return !prev;
      });
    },
    setAuth: (type) => {
      setAuthType(type);
    },
  };

  console.log("ok");

  /////////////////////////////////////////////////////////
  return (
    <CartProvider>
      {isShowCart && <Cart toggleCart={toggleHandler.toggleCart} />}
      {isShowAuth && (
        <Auth
          toggleCart={toggleHandler.toggleAuth}
          authType={authType}
          setAuth={toggleHandler.setAuth}
        />
      )}
      {isShowOrders && <Orders toggleCart={toggleHandler.toggleOrders} />}

      <Header toggleHandler={toggleHandler} />
      <MealsSummary />
      <AvailableMeals />
    </CartProvider>
  );
}

export default App;
