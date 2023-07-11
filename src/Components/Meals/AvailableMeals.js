import React, { useContext, useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card/Card";

import MealItem from "./MealItem";
import useFetch from "../../hooks/use-fetch";
import CartContext from "../../Context/CartContext";

const AvailableMeals = () => {
  const cartCtx = useContext(CartContext);
  //// useFetch Started

  const { isLoading, error, fetchData } = useFetch();
  const {
    isLoading: isLoadingLogin,
    error: errorLogin,
    fetchData: fetchLoginData,
  } = useFetch();
  const [mealsData, setMealsData] = useState([]);

  const ApplyDataFunc = (data) => {
    const loadedMeals = [];
    for (const key in data) {
      loadedMeals.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      });
    }

    setMealsData(loadedMeals);
  };

  useEffect(() => {
    //// FOR CREATING SEESSION CHECKING LOGIN STATUS IF ALREADY
    const loginId = localStorage.getItem("loginId");

    if (loginId) {
      const ApplyDataFunc = (element) => {
        console.log("fromAvailableMeals", element);
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
      };
      fetchLoginData(
        {
          url: process.env.REACT_APP_FIREBASEAPI + `/users/${loginId}.json`,
        },
        ApplyDataFunc
      );
    }
    fetchData(
      {
        url: process.env.REACT_APP_FIREBASEAPI + "/meals.json",
      },
      ApplyDataFunc
    );
  }, [fetchData, fetchLoginData]);

  console.log("isloading:", isLoading);
  console.log("error", error);

  //// useFetch end

  let content =
    mealsData.length > 0 ? (
      <ul>
        {mealsData.map((each) => {
          return (
            <MealItem
              key={each.id}
              itemId={each.id}
              name={each.name}
              description={each.description}
              price={each.price}
            />
          );
        })}
      </ul>
    ) : (
      <h2>No Meals Data Found In DataBase. Add Some!</h2>
    );

  if (error) {
    content = (
      <>
        <h2>There is an error : {error}</h2>
        <button
          onClick={() => {
            window.location.reload(false);
          }}
        >
          Try Again
        </button>
      </>
    );
  }
  if (isLoading) {
    content = <h2>Loading....</h2>;
  }

  return (
    <div className={classes.meals}>
      <Card>{content}</Card>
    </div>
  );
};

export default AvailableMeals;
