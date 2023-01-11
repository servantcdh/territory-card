import React from "react";

const Container = ({ className, children, htmlRef }) => {
  return <div ref={htmlRef} className={` ${className}`}>{children}</div>;
};

export default Container;
