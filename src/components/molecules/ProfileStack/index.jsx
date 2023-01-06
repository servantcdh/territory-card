import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../../atoms/Profile";

const ProfileStack = ({ users }) => {
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
          key={`stack_${u.idx}`}
          userIdx={u.idx}
          src={u.profile}
          name={u.name}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default ProfileStack;
