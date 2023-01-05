import React from "react";
import Card from "../../atoms/Card";
import Profile from "../../atoms/Profile";
import Tag from "../../atoms/Tag";

const ProfileCard = ({ className, user, checked, assigned, onClick }) => {
  const { userIdx, profile, name, live, gender, car, guide, auth, baptize } =
    user;
  const liveActive = live ? "bg-primary-200" : "bg-primary-400";
  const checkActive = checked ? "" : liveActive;
  const onClickHandler = () => {
    onClick(userIdx, checked, assigned);
  };
  return (
    <Card
      className={`flex items-center space-x-4 text-md font-display p-1 mb-1 ${checkActive} ${className}`}
      onClick={onClickHandler}
    >
      <Profile key={userIdx} src={profile} name={name} live={live} />
      <div className="text-base text-black">
        <div>
          {name}
          {!!gender ? "👨🏻‍💼" : "👩🏻‍💼"}
          {!!baptize ? "" : "🔰"}
          {!!guide ? "💼" : ""}
          {!!auth ? "🧑🏻‍🔧" : ""}
          &nbsp;
          {!!assigned ? <Tag>담당자</Tag> : ""}
          {!!car ? <p className="animate-bounce">🚗</p> : ""}
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
