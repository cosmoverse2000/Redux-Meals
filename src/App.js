import React, { useState } from "react";

import Header from "./Components/UI/Header/Header";
import MealsSummary from "./Components/MealsSummary/MealsSummary";
import AvailableMeals from "./Components/Meals/AvailableMeals";
import Cart from "./Components/Cart/Cart";

import mealsData from "./Data/dummy-meals";

function App() {
  const [isShowCart, setIsShowCart] = useState(false);
  const [isAnimate, setIsAnimate] = useState(true);

  const showCartHandler = () => {
    setIsShowCart(true);
  };
  const setShowCartFalse = () => {
    setIsShowCart(false);
  };

  ////////////////// CART DATA TO BE MANAGED AND TOTAL SUM FOR ORDER

  const [cartData, setCartData] = useState([]);

  const countAmount = () => {
    let sum = 0;
    cartData.forEach((e) => {
      sum += e.mealPrice * e.mealCount;
    });
    // console.log("counted");
    return sum;
  };

  const [totalAmount, setTotalAmount] = useState(countAmount());

  /////////////// FOR HEADER BUTTON TOTAL MEALS ADDED TO CART
  const [totalCartItems, setTotalCartItems] = useState(() => {
    let totalItems = 0;
    cartData.forEach((e) => {
      totalItems += e.mealCount;
    });
    return totalItems;
  });

  const setIsAnimateHelper = () => {
    setIsAnimate(false);
    setTimeout(() => {
      setIsAnimate(true);
    }, 1);
  };

  const removeItemHandler = (mealIdToRemov) => {
    const newCartData = [...cartData];
    const mealObj = newCartData.find((obj) => {
      //finding the meal object SELECTED of  particular IDS IN ARRAY
      return obj.mealId === mealIdToRemov;
    });

    if (mealObj.mealCount === 1) {
      const leftData = newCartData.filter((each) => {
        return each.mealId !== mealIdToRemov;
      });

      setCartData(leftData);

      setTotalAmount(() => {
        let sum = 0;
        leftData.forEach((e) => {
          sum += e.mealPrice * e.mealCount;
        });
        return sum;
      });

      setTotalCartItems((prev) => {
        setIsAnimateHelper();
        return prev - 1;
      });
      return;
    }

    --mealObj.mealCount; //changing meal Count

    setCartData(newCartData);
    setTotalAmount(countAmount());
    setTotalCartItems((prev) => {
      setIsAnimateHelper();
      return prev - 1;
    });
  };

  const addItemHandler = (mealIdToAdd) => {
    const newCartData = [...cartData];

    const mealObj = newCartData.find((obj) => {
      //finding the meal object of  particular ID
      return obj.mealId === mealIdToAdd;
    });

    // console.log(mealObj);

    if (mealObj.mealCount === 20) {
      return;
    } else {
      ++mealObj.mealCount; //changing meal Count
    }

    setCartData(newCartData);
    setTotalAmount(countAmount());
    setTotalCartItems((prev) => {
      setIsAnimateHelper();
      return prev + 1;
    });
    // props.onAddCartItem();
  };

  console.log("ok", cartData);

  ////////////////// MEALS TO ADDTO CART FROM MEALS ITEM FORM///////////

  const addItemsFromMealForm = (mealToAdd) => {
    // console.log({
    //   val: mealToAdd.val,
    //   itemId: mealToAdd.itemId,
    //   price: mealToAdd.price,
    // });

    const newCartData = [...cartData];

    const mealObj = newCartData.find((obj) => {
      //finding the meal object of  particular ID
      return obj.mealId === mealToAdd.itemId;
    });

    if (mealObj === undefined) {
      // console.log(mealObj);
      setCartData([
        ...newCartData,
        {
          mealId: mealToAdd.itemId,
          mealPrice: mealToAdd.price,
          mealCount: mealToAdd.val,
        },
      ]);
      setTotalCartItems((prev) => {
        setIsAnimateHelper();
        return prev + mealToAdd.val;
      });
    } else if (mealObj.mealCount === 20) {
      return;
    } else {
      const limitItems =
        mealObj.mealCount + mealToAdd.val > 20
          ? 20 - mealObj.mealCount
          : mealToAdd.val;

      mealObj.mealCount += limitItems;

      // console.log("limittem", limitItems);
      setCartData(newCartData);
      setTotalCartItems((prev) => {
        setIsAnimateHelper();
        return prev + limitItems;
      });
    }

    setTotalAmount(countAmount());
  };

  /////////////////////////////////////////////////////////
  return (
    <>
      <Header
        showCart={showCartHandler}
        totalCartItems={totalCartItems}
        isAnimate={isAnimate}
      />
      <MealsSummary />
      <AvailableMeals
        mealsData={mealsData}
        addItemsFromMealForm={addItemsFromMealForm}
      />
      {isShowCart && (
        <Cart
          setShowCartFalse={setShowCartFalse}
          removeItemHandler={removeItemHandler}
          addItemHandler={addItemHandler}
          totalAmount={totalAmount}
          cartData={cartData}
        />
      )}
    </>
  );
}

export default App;
