import React from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  return (
    <div className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>${props.price}</div>
      </div>
      <MealItemForm
        itemId={props.itemId}
        price={props.price}
        addItemsFromMealForm={props.addItemsFromMealForm}
      />
    </div>
  );
};

export default MealItem;
