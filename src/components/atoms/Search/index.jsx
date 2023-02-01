import React, { useEffect, useRef, useState } from "react";
const Search = ({ className, placeholder, value, onSubmit }) => {
  const inputRef = useRef();
  const [keyword, setKeyword] = useState(value ? value : "init");
  const [hasInit, setHasInit] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (keyword !== "init" && (hasSearched || keyword !== value)) {
        if (!hasSearched) {
          setHasSearched(true);
        }
        onSubmit(keyword);
      }
      clearTimeout(timeout);
    }, 700);
    if (!hasInit && value) {
      setHasInit(true);
      inputRef.current.value = value;
      inputRef.current.focus();
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [keyword, onSubmit]);
  const onKeyUpHandler = (event) => {
    setKeyword(event.target.value);
  };
  const onClickHandler = () => {
    setKeyword("");
  };
  return (
    <input
      type="search"
      ref={inputRef}
      className={` ${className}`}
      placeholder={placeholder}
      onKeyUp={onKeyUpHandler}
      onClick={onClickHandler}
    />
  );
};

export default Search;
