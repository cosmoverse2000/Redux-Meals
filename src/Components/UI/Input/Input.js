import React from "react";
import classes from "./Input.module.css";
// import { useRef } from "react";

const Input = (props) => {
  // const inputRef = useRef();
  // console.log(inputRef);
  return (
    <div className={classes.input}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        // ref={inputRef}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        max={props.max}
        min={props.min}
      />
    </div>
  );
};

export default Input;
