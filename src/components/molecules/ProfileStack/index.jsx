import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../../atoms/Profile";

const ProfileStack = ({ className, users, userIdx }) => {
  const navigate = useNavigate();
  const onClick = useCallback(
    (userIdx) => {
      navigate(`/profile/${userIdx}`);
    },
    [navigate]
  );
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
    </div>
  );
};

export default ProfileStack;
