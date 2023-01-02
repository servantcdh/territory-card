import React from "react";
import Card from "../../atoms/Card";
import Profile from "../../atoms/Profile";

const ProfileCard = (props) => {
  const { userIdx, profile, name, live, gender, car, guide, auth, baptize } =
    props.user;
  return (
    <Card className="flex items-center space-x-4 text-xl font-display p-1">
      <Profile
        key={userIdx}
        src={profile}
        name={name}
        live={live}
      />
      <div className="font-medium text-black">
        <div>
            {name}
            {!!gender ? '👨🏻‍💼' : '👩🏻‍💼'}
            {!!baptize ? '' : '🔰'}
            {!!car ? '🚗' : ''}
            {!!guide ? '💼' : ''}
            {!!auth ? '🧑🏻‍🔧' : ''}
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
