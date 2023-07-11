import React from "react";
import classes from "./RegisterForm.module.css";
import useValidator from "../../hooks/use-validator";

const LoginForm = (props) => {
  ////// INPUT VALIDTIONS START
  const {
    enteredInput: emailInput,
    enteredInputIsValid: enteredEmailIsValid,
    inputIsInvalid: emailIsInvalid,
    inputChangeHandler: emailInputHandler,
    inputBlurHandler: emailInputBlurHandler,
    resetInput: resetEmailInput,
  } = useValidator(
    (value) => value.trim() !== "" && value.includes("@") && value.includes(".")
  );
  const {
    enteredInput: passInput,
    enteredInputIsValid: enteredPassIsValid,
    inputIsInvalid: passIsInvalid,
    inputChangeHandler: passInputHandler,
    inputBlurHandler: passInputBlurHandler,
    resetInput: resetPassInput,
  } = useValidator((value) => value.trim().length > 6);

  let formIsValid = false;
  if (enteredEmailIsValid && enteredPassIsValid) {
    formIsValid = true;
  }

  const resetForm = () => {
    resetEmailInput();
    resetPassInput();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      email: emailInput,
      pass: passInput,
    });
    resetForm();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes["input-container"]}>
        <div
          className={
            emailIsInvalid
              ? `${classes.input} ${classes.invalid}`
              : classes.input
          }
        >
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={emailInput}
            onChange={emailInputHandler}
            onBlur={emailInputBlurHandler}
          ></input>
        </div>
        {emailIsInvalid && (
          <p className={classes["error-text"]}>Email is Invalid!</p>
        )}
        <div
          className={
            passIsInvalid
              ? `${classes.input} ${classes.invalid}`
              : classes.input
          }
        >
          <label htmlFor="pass">Password</label>
          <input
            id="pass"
            type="password"
            value={passInput}
            onChange={passInputHandler}
            onBlur={passInputBlurHandler}
          ></input>
        </div>
        {passIsInvalid && (
          <p className={classes["error-text"]}>Make a strong password!</p>
        )}

        <div className={classes.actions}>
          <p>Not registered ?</p>
          <div>
            <button
              className={classes["button--alt"]}
              type="reset"
              onClick={resetForm}
            >
              Reset
            </button>
            <button
              className={classes.button}
              type="submit"
              disabled={!formIsValid}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
