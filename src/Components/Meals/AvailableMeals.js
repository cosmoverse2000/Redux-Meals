import React, { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card/Card";

import MealItem from "./MealItem";
import useFetch from "../../hooks/use-fetch";

const AvailableMeals = () => {
  const { isLoading, error, fetchData } = useFetch();
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
    fetchData(
      {
        url: "https://react-http-db9a9-default-rtdb.firebaseio.com/meals.json",
      },
      ApplyDataFunc
    );
  }, [fetchData]);

  console.log("isloading:", isLoading);
  console.log("error", error);

  return (
    <div className={classes.meals}>
      <Card>
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>There Is An ERROR : {error}</p>}
        <ul>
          {mealsData.length > 0 &&
            mealsData.map((each) => {
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
      </Card>
    </div>
  );
};

export default AvailableMeals;
