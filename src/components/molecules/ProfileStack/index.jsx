import React from "react";
import Profile from "../../atoms/Profile";

const ProfileStack = ({ users }) => {
  return (
    <div className="flex -space-x-4">
      {users.map((u) => (
        <Profile key={`stack_${u.idx}`} src={u.profile} name={u.name} />
      ))}
    </div>
  );
};

export default ProfileStack;
