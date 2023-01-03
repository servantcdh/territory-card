import React from "react";

const Tag = (props) => {
  const className = `rounded border border-black border-2 px-1 bg-rose-400 font-thin text-sm ${props.className}`;
  return <span className={className}>{props.children}</span>;
};

export default Tag;
