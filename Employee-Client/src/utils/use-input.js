import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case "INPUT":
      return { ...state, value: action.value, isTouched: true };
    case "BLUR":
      return { ...state, isTouched: true };
    case "RESET":
      return initialInputState;
    default:
      return state;
  }
};

const useInput = (validateValue, maxNum, minNum) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState,
  );

  let valueIsValid =
    !validateValue || (validateValue && validateValue(inputState.value));

  if (maxNum !== undefined && minNum !== undefined) {
    valueIsValid =
      valueIsValid &&
      Number(inputState.value.replace(/,/g, "")) >= minNum &&
      Number(inputState.value.replace(/,/g, "")) <= maxNum;
  }

  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const setValueHandler = (value) => {
    dispatch({ type: "INPUT", value });
  };

  const inputBlurHandler = (event) => {
    if (event && event.target.readOnly) {
      return;
    }
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    setValueHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
