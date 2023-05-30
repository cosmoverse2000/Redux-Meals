import React, { useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../UI/Input/Input";

const MealItemForm = (props) => {
  const [amountVal, setAmountVal] = useState(1);
  const inputChangeHandler = (e) => {
    setAmountVal(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    props.addItemsFromMealForm({
      val: +amountVal,
      itemId: props.itemId,
      price: props.price,
    });
    setAmountVal(amountVal);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.form}>
        <Input
          id={"amount"}
          type={"number"}
          label={"Amount"}
          value={amountVal}
          onChange={inputChangeHandler}
          min={1}
          max={20}
        />
        <button type="submit">+Add</button>
      </div>
    </form>
  );
};

export default MealItemForm;
