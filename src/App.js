import React, { useState } from "react";

import Header from "./Components/UI/Header/Header";
import MealsSummary from "./Components/MealsSummary/MealsSummary";
import AvailableMeals from "./Components/Meals/AvailableMeals";
import Cart from "./Components/Cart/Cart";

function App() {
  const [isShowCart, setIsShowCart] = useState(false);

  const showCartHandler = () => {
    setIsShowCart(true);
  };
  const setShowCartFalse = () => {
    setIsShowCart(false);
  };
  return (
    <>
      <Header showCart={showCartHandler} />
      <MealsSummary />
      <AvailableMeals />
      {isShowCart && <Cart setShowCartFalse={setShowCartFalse} />}
    </>
  );
}

export default App;
