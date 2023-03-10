import React from "react";
import Search from "../../atoms/Search";
const SearchUser = ({ className, onSubmit }) => {
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
        <Search
          className="block w-full p-2 pl-10 text-sm text-gray-900 border-black border-4 rounded bg-amber-100"
          placeholder="전도인을 검색합니다..."
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default SearchUser;
