import React from "react";

const Button = (props) => {
  const className = `border border-black border-4 px-3 py-1 bg-orange-400 rounded ${props.className}`;
  return (
    <button className={className} type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
