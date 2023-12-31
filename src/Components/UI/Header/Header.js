import React from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import img from "../../../Data/Images/meals.jpg";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReduxMeals</h1>
        <HeaderCartButton toggleHandler={props.toggleHandler} />
      </header>
      <div className={classes["main-image"]}>
        <img src={img} alt="meals_photo" />
      </div>
    </>
  );
};

export default Header;
