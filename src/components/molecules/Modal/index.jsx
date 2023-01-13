import React from "react";
import ReactDOM from "react-dom";
import Body from "../../atoms/Body";
import Button from "../../atoms/Button";
import Card from "../../atoms/Card";

const Backdrop = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-20 bg-primary-700 animate-fadeIn" />
  );
};

const ModalOverlay = ({
  className,
  children,
  title,
  buttonName,
  buttonDisabled,
  onConfirm,
  cancelName,
  onCancel,
}) => {
  return (
    <Card
      className={`m-auto w-11/12 max-h-[600px] lg:w-[500px] lg:max-h-[800px] p-0 animate-scale box-border border-amber-500 border-4 rounded ${className}`}
    >
      <header className="p-3 text-xl font-bold">
        <h2>{title}</h2>
      </header>
      <div className="relative p-3 h-auto max-h-[450px] lg:max-h-[700px] overflow-y-scroll scrollbar-hide bg-white text-sm font-thin">
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
  className,
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
        <Body className="fixed flex items-center animate-none bg-transparent z-30">
          <ModalOverlay
            title={title}
            className={className}
            buttonName={buttonName}
            cancelName={cancelName}
            buttonDisabled={buttonDisabled}
            onConfirm={onConfirm}
            onCancel={onCancel}
          >
            {children}
          </ModalOverlay>
        </Body>,
        portalElement
      )}
    </>
  );
};

export default Modal;
