import React from "react";

const Profile = (props) => {
  return (
    <div className="relative">
      {props.src && (
        <img
          className="p-0 w-12 h-12 rounded-full"
          src={props.src}
          alt={props.name}
        />
      )}
      {!props.src && props.name && (
        <div className="inline-flex overflow-hidden relative justify-center items-center w-12 h-12 bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {props.name.substring(1)}
          </span>
        </div>
      )}
      {props.live === 1 && (
        <span className="top-0 left-9 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
      )}
    </div>
  );
};

export default Profile;
