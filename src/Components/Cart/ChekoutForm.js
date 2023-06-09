import React from "react";
import classes from "./CheckoutForm.module.css";
import useValidator from "../../hooks/use-validator";

const ChekoutForm = (props) => {
  ////// INPUT VALIDTIONS START
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
    enteredNameIsValid &&
    enteredAddressIsValid &&
    enteredContactIsValid &&
    enteredPinIsValid
  ) {
    formIsValid = true;
  }

  const resetForm = () => {
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
            nameIsInvalid
              ? `${classes.input} ${classes.invalid}`
              : classes.input
          }
        >
          <label htmlFor="name">Your Name</label>
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
          <label htmlFor="contact">Contact</label>
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
          <label htmlFor="address">Address</label>
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
          <label htmlFor="pin">PIN Code</label>
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
          Confirm
        </button>
      </div>
    </form>
  );
};

export default ChekoutForm;

// const [nameInput, setNameInput] = useState("");
// const [isTouched, setIsTouched] = useState(false);

// const enteredNameIsValid = nameInput.trim() !== "";
// const nameIsInvalid = isTouched && !enteredNameIsValid;

// const nameInputHandler = (e) => {
//   setNameInput(e.target.value);
// };
// const nameInputBlurHandler = () => {
//   setIsTouched(true);
// };
