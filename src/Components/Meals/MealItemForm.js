import React, { useContext, useState, useRef } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../UI/Input/Input";
import CartContext from "../../Context/CartContext";

const MealItemForm = (props) => {
  const cartCtx = useContext(CartContext);
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    if (cartCtx.isLogged) {
      const enteredAmount = amountInputRef.current.value;

      if (
        enteredAmount.trim().length === 0 ||
        +enteredAmount < 1 ||
        +enteredAmount > 5
      ) {
        setAmountIsValid(false);
        return;
      }
      cartCtx.addItemHandler({
        mealCount: +enteredAmount,
        mealId: props.itemId,
        mealPrice: props.price,
        mealName: props.name,
      });
    } else {
      console.log("please LOGIN ....");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.form}>
        <Input
          ref={amountInputRef}
          label="Amount"
          input={{
            id: "amount_" + props.itemId,
            type: "number",
            min: "1",
            max: "5",
            step: "1",
            defaultValue: "1",
          }}
        />
        <button type="submit">+Add</button>
        {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
      </div>
    </form>
  );
};

export default MealItemForm;
