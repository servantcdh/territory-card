import React, { useCallback } from "react";

const Profile = ({ className, liveClassName, profile, userIdx, name, live, assigned, onClick }) => {
  const onClickHandler = useCallback(() => {
    if (onClick) {
      onClick(userIdx);
    }
  }, [onClick, userIdx]);
  return (
    <div className={`relative animate-scale`}>
      {profile && (
        <img
          className={`p-0 w-12 h-12 rounded-full ${className} ${assigned ? "border-[2px] border-orange-600" : ""}`}
          src={profile}
          alt={name}
          loading="lazy"
          onClick={onClickHandler}
        />
      )}
      {!profile && name && (
        <div
          className={`inline-flex overflow-hidden relative justify-center items-center w-12 h-12 ${assigned ? "bg-orange-600" : "bg-gray-600"} rounded-full ${className}`}
          onClick={onClickHandler}
        >
          <span className="text-base text-gray-300">{name.length > 2 ? name.substring(1, 3) : name}</span>
        </div>
      )}
      {!!live && (
        <span className={`top-0 left-9 flex h-3 w-3 absolute ${liveClassName}`}>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      )}
    </div>
  );
};

export default Profile;
