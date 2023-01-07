import React, { useCallback } from "react";

const Profile = ({ className, profile, userIdx, name, live, onClick }) => {
  const onClickHandler = useCallback(() => {
    if (onClick) {
      onClick(userIdx);
    }
  }, [onClick, userIdx]);
  return (
    <div className={`w-12 relative animate-scale ${className}`}>
      {profile && (
        <img
          className={`p-0 w-12 h-12 rounded-full ${className}`}
          src={profile}
          alt={name}
          onClick={onClickHandler}
        />
      )}
      {!profile && name && (
        <div
          className={`inline-flex overflow-hidden relative justify-center items-center w-12 h-12 bg-gray-600 rounded-full ${className}`}
          onClick={onClickHandler}
        >
          <span className="text-base text-gray-300">{name.substring(1)}</span>
        </div>
      )}
      {!!live && (
        <span className="top-0 left-9 flex h-3 w-3 absolute">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      )}
    </div>
  );
};

export default Profile;
