import React from "react";
import classes from "./RegisterForm.module.css";
import useValidator from "../../hooks/use-validator";

const RegisterForm = (props) => {
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
  const {
    enteredInput: nameInput,
    enteredInputIsValid: enteredNameIsValid,
    inputIsInvalid: nameIsInvalid,
    inputChangeHandler: nameInputHandler,
    inputBlurHandler: nameInputBlurHandler,
    resetInput: resetNameInput,
  } = useValidator((value) => value.trim() !== "");
  const {
    enteredInput: contactInput,
    enteredInputIsValid: enteredContactIsValid,
    inputIsInvalid: contactIsInvalid,
    inputChangeHandler: contactInputHandler,
    inputBlurHandler: contactInputBlurHandler,
    resetInput: resetContactInput,
  } = useValidator((value) => value.trim().length === 10);
  const {
    enteredInput: addressInput,
    enteredInputIsValid: enteredAddressIsValid,
    inputIsInvalid: addressIsInvalid,
    inputChangeHandler: addressInputHandler,
    inputBlurHandler: addressInputBlurHandler,
    resetInput: resetAddressInput,
  } = useValidator((value) => value.trim() !== "");
  const {
    enteredInput: pinInput,
    enteredInputIsValid: enteredPinIsValid,
    inputIsInvalid: pinIsInvalid,
    inputChangeHandler: pinInputHandler,
    inputBlurHandler: pinInputBlurHandler,
    resetInput: resetPinInput,
  } = useValidator((value) => value.trim().length === 6);

  ////// INPUT VALIDTIONS END

  let formIsValid = false;
  if (
    enteredEmailIsValid &&
    enteredPassIsValid &&
    enteredNameIsValid &&
    enteredAddressIsValid &&
    enteredContactIsValid &&
    enteredPinIsValid
  ) {
    formIsValid = true;
  }

  const resetForm = () => {
    resetEmailInput();
    resetPassInput();
    resetNameInput();
    resetAddressInput();
    resetContactInput();
    resetPinInput();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      email: emailInput,
      pass: passInput,
      name: nameInput,
      contact: contactInput,
      address: addressInput,
      pinCode: pinInput,
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
        <div
          className={
            nameIsInvalid
              ? `${classes.input} ${classes.invalid}`
              : classes.input
          }
        >
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            value={nameInput}
            onChange={nameInputHandler}
            onBlur={nameInputBlurHandler}
          ></input>
        </div>
        {nameIsInvalid && (
          <p className={classes["error-text"]}>Name Cannot be Empty!</p>
        )}

        <div
          className={
            contactIsInvalid
              ? `${classes.input} ${classes.invalid}`
              : classes.input
          }
        >
          <label htmlFor="contact">Contact No.</label>
          <input
            id="contact"
            type="contact"
            value={contactInput}
            onChange={contactInputHandler}
            onBlur={contactInputBlurHandler}
          ></input>
        </div>
        {contactIsInvalid && (
          <p className={classes["error-text"]}>Contact must be 10 digits!</p>
        )}

        <div
          className={
            addressIsInvalid
              ? `${classes.input} ${classes.invalid}`
              : classes.input
          }
        >
          <label htmlFor="address">Default Address</label>
          <input
            id="address"
            type="text"
            value={addressInput}
            onChange={addressInputHandler}
            onBlur={addressInputBlurHandler}
          ></input>
        </div>
        {addressIsInvalid && (
          <p className={classes["error-text"]}>Address Cannot be Empty!</p>
        )}

        <div
          className={
            pinIsInvalid ? `${classes.input} ${classes.invalid}` : classes.input
          }
        >
          <label htmlFor="pin">Default PIN Code</label>
          <input
            id="pin"
            type="contact"
            value={pinInput}
            onChange={pinInputHandler}
            onBlur={pinInputBlurHandler}
          ></input>
        </div>
        {pinIsInvalid && (
          <p className={classes["error-text"]}>PIN must be 6 digits!</p>
        )}
      </div>

      <div className={classes.actions}>
        <p>Already registered ?</p>
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
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
