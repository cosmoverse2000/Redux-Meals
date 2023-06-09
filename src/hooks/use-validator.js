import { useReducer } from "react";

const intialInputState = { enteredInput: "", isTouched: false };

const inputReducer = (state, action) => {
  if (action.type === "INPUT_CHANGE") {
    return { enteredInput: action.payload, isTouched: state.isTouched };
  }
  if (action.type === "INPUT_BLUR") {
    return { enteredInput: state.enteredInput, isTouched: true };
  }
  if (action.type === "INPUT_RESET") {
    return intialInputState;
  }
  return intialInputState;
};

const useValidator = (validatorFunc) => {
  const [inputState, dispatch] = useReducer(inputReducer, intialInputState);

  const enteredInputIsValid = validatorFunc(inputState.enteredInput);
  const inputIsInvalid = inputState.isTouched && !enteredInputIsValid;

  const inputChangeHandler = (e) => {
    dispatch({ type: "INPUT_CHANGE", payload: e.target.value });
    // setEnteredInput(e.target.value);
  };
  const inputBlurHandler = () => {
    dispatch({ type: "INPUT_BLUR" });
    //   setIsTouched(true);
  };
  const resetInput = () => {
    dispatch({ type: "INPUT_RESET" });
    // setEnteredInput("");
    // setIsTouched(false);
  };
  return {
    enteredInput: inputState.enteredInput,
    enteredInputIsValid,
    inputIsInvalid,
    inputChangeHandler,
    inputBlurHandler,
    resetInput,
  };
};

export default useValidator;
