import React from "react";
import ReactDOM from "react-dom";
import Button from "../../atoms/Button";
import Card from "../../atoms/Card";

const Backdrop = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-20 bg-primary-700 animate-fadeIn" />
  );
};

const ModalOverlay = (props) => {
  return (
    <Card className="fixed m-auto w-11/12 h-3/5 inset-0 p-0 z-30 animate-scale box-border border-amber-500 border-4 rounded">
      <header className="p-3 text-xl font-bold">
        <h2>{props.title}</h2>
      </header>
      <div className="relative p-3 h-3/4 overflow-y-scroll bg-white text-sm font-thin">
        {props.children}
      </div>
      <footer className="p-4 text-center">
        <Button
          className="animate-bounce"
          onClick={props.onConfirm}
          disabled={props.buttonDisabled}
        >
          {props.buttonName}
        </Button>
        {props.cancelName && (
          <Button className="bg-rose-500 ml-1" onClick={props.onCancel}>
            {props.cancelName}
          </Button>
        )}
      </footer>
    </Card>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          buttonName={props.buttonName}
          cancelName={props.cancelName}
          buttonDisabled={props.buttonDisabled}
          onConfirm={props.onConfirm}
          onCancel={props.onCancel}
        >
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
