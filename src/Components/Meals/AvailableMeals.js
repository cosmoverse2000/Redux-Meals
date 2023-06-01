import React from "react";

import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card/Card";

import MealItem from "./MealItem";
import mealsData from "../../Data/dummy-meals";

const AvailableMeals = () => {
  return (
    <div className={classes.meals}>
      <Card>
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
      </Card>
    </div>
  );
};

export default AvailableMeals;
