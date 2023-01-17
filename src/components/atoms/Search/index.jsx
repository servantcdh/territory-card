import React, { useEffect, useState } from "react";
const Search = ({ className, onSubmit }) => {
  const [keyword, setKeyword] = useState("init");
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (keyword !== "init") {
        onSubmit(keyword);
      }
      clearTimeout(timeout);
    }, 700);
    return () => {
      clearTimeout(timeout);
    };
  }, [keyword, onSubmit]);
  const onKeyUpHandler = (event) => {
    setKeyword(event.target.value);
  };
  const onClickHandler = (event) => {
    setKeyword("");
  };
  return (
    <div className={`${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          className="block w-full p-2 pl-10 text-sm text-gray-900 border-black border-4 bg-amber-100"
          placeholder="전도인을 검색합니다..."
          onKeyUp={onKeyUpHandler}
          onClick={onClickHandler}
        />
      </div>
    </div>
  );
};

export default Search;
