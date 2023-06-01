import React, { useState } from "react";

import Header from "./Components/UI/Header/Header";
import MealsSummary from "./Components/MealsSummary/MealsSummary";
import AvailableMeals from "./Components/Meals/AvailableMeals";
import Cart from "./Components/Cart/Cart";
import { CartProvider } from "./Context/CartProvider";

function App() {
  const [isShowCart, setIsShowCart] = useState(false);

  const toggleCart = () => {
    setIsShowCart((prev) => {
      return !prev;
    });
  };

  console.log("ok");

  /////////////////////////////////////////////////////////
  return (
    <CartProvider>
      {isShowCart && <Cart toggleCart={toggleCart} />}
      <Header toggleCart={toggleCart} />
      <MealsSummary />
      <AvailableMeals />
    </CartProvider>
  );
}

export default App;
