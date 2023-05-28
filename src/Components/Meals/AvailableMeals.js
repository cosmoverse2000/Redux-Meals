import React from "react";
import Card from "../UI/Card/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";

const AvailableMeals = () => {
  return (
    <div className={classes.meals}>
      <Card>
        <ul>
          <MealItem />
          <MealItem />
          <MealItem />
          <MealItem />
        </ul>
      </Card>
    </div>
  );
};

export default AvailableMeals;
