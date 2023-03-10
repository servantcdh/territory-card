import React, { useCallback } from "react";

const Tag = ({ className, children, tags, tagsIgnored, onClick }) => {
  const tag = children.replace("#", "");
  const isTags = (tags ? tags : []).includes(tag);
  const isIgnoreds = (tagsIgnored ? tagsIgnored : []).includes(tag);
  const onClickHandler = useCallback(() => {
    if (onClick) {
      onClick(tag);
    }
  }, [onClick, tag]);
  let activeClass = "";
  if (!isTags && !isIgnoreds) {
    activeClass = "bg-amber-600";
  } else if (isTags) {
    activeClass = "bg-amber-300";
  } else if (isIgnoreds) {
    activeClass = "bg-gray-700";
  }
  return (
    <span
      className={`rounded border-black border-2 px-1 font-thin text-sm ${activeClass} ${className}`}
      onClick={onClickHandler}
    >
      {children}
    </span>
  );
};

export default Tag;
