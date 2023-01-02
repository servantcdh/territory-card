import React from "react";
import Profile from "../../atoms/Profile";

const ProfileStack = (props) => {
  return (
    <div className="flex mb-5 -space-x-4">
      {props.users.map((u) => (
        <Profile key={u.userIdx} src={u.profile} name={u.name} />
      ))}
    </div>
  );
};

export default ProfileStack;
