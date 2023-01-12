import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../../atoms/Profile";

const ProfileStack = ({ className, users, userIdx, length }) => {
  const navigate = useNavigate();
  const onClick = useCallback(
    (userIdx) => {
      navigate(`/profile/${userIdx}`);
    },
    [navigate]
  );
  let overLength = 0;
  if (users.length > length) {
    overLength = users.length - length;
    users = users.slice(0, length);
  }
  return (
    <div className="flex -space-x-4">
      {users.map((u) => (
        <Profile
          className={`border-2 border-gray-800 ${className}`}
          key={`stack_${u.idx}`}
          userIdx={u.idx}
          profile={u.profile}
          name={u.name}
          assigned={u.idx === userIdx}
          onClick={onClick}
        />
      ))}
      {overLength > 0 && (
        <a
          className={`flex items-center justify-center w-12 h-12 text-xs font-medium text-white bg-gray-700 border-2 rounded-full border-gray-800 z-20 ${className}`}
        >
          +{overLength}
        </a>
      )}
    </div>
  );
};

export default ProfileStack;
