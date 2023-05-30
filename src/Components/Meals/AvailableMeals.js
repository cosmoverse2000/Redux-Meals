import React from "react";

import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card/Card";

import MealItem from "./MealItem";

const AvailableMeals = (props) => {
  return (
    <div className={classes.meals}>
      <Card>
        <ul>
          {props.mealsData.map((each) => {
            return (
              <MealItem
                key={each.id}
                itemId={each.id}
                name={each.name}
                description={each.description}
                price={each.price}
                addItemsFromMealForm={props.addItemsFromMealForm}
              />
            );
          })}
        </ul>
      </Card>
    </div>
  );
};

export default AvailableMeals;
