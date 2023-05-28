import React from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div className={classes.backdrop} onClick={props.onBackdropClick} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <div className={classes.modal}>{props.children}</div>,
        document.getElementById("overlay-root")
      )}
      ;
    </>
  );
};

export default Modal;
