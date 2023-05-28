import React from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = () => {
  return (
    <div className={classes.meal}>
      <div>
        <h3>Shushi</h3>
        <div className={classes.description}>Finest fish and veggies</div>
        <div className={classes.price}>$22.99</div>
      </div>
      <MealItemForm />
    </div>
  );
};

export default MealItem;
