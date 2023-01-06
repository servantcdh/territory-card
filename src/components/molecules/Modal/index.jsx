import React from "react";
import ReactDOM from "react-dom";
import Button from "../../atoms/Button";
import Card from "../../atoms/Card";

const Backdrop = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-20 bg-primary-700 animate-fadeIn" />
  );
};

const ModalOverlay = ({
  children,
  title,
  buttonName,
  buttonDisabled,
  onConfirm,
  cancelName,
  onCancel,
}) => {
  return (
    <Card className="fixed m-auto w-11/12 max-h-96 inset-x-0 top-24 p-0 z-30 animate-scale box-border border-amber-500 border-4 rounded">
      <header className="p-3 text-xl font-bold">
        <h2>{title}</h2>
      </header>
      <div className="relative p-3 h-auto max-h-64 overflow-y-scroll bg-white text-sm font-thin">
        {children}
      </div>
      <footer className="p-4 text-center">
        <Button
          className="animate-bounce"
          onClick={onConfirm}
          disabled={buttonDisabled}
        >
          {buttonName}
        </Button>
        {cancelName && (
          <Button className="bg-rose-500 ml-1" onClick={onCancel}>
            {cancelName}
          </Button>
        )}
      </footer>
    </Card>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = ({
  children,
  title,
  buttonName,
  buttonDisabled,
  onConfirm,
  cancelName,
  onCancel,
}) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={title}
          buttonName={buttonName}
          cancelName={cancelName}
          buttonDisabled={buttonDisabled}
          onConfirm={onConfirm}
          onCancel={onCancel}
        >
          {children}
        </ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
