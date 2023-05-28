import React from "react";
import classes from "./MealItemForm.module.css";
import Input from "../UI/Input/Input";

const MealItemForm = () => {
  return (
    <form>
      <div className={classes.form}>
        <Input type="number" label={"Amount"} value={1} />
        <button>+Add</button>
      </div>
    </form>
  );
};

export default MealItemForm;
