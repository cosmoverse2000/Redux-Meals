import React from "react";
import classes from "./MealItemForm.module.css";
import Input from "../UI/Input/Input";

const MealItemForm = () => {
  const inputChangeHandler = (e) => {};

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className={classes.form}>
        <Input type="number" label={"Amount"} onChange={inputChangeHandler} />
        <button type="submit">+Add</button>
      </div>
    </form>
  );
};

export default MealItemForm;
