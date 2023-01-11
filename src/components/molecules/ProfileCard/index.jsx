import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../atoms/Card";
import Profile from "../../atoms/Profile";
import Tag from "../../atoms/Tag";

const ProfileCard = ({ className, user, checked, assigned, onClick }) => {
  const { userIdx, profile, name, live, gender, car, guide, auth, baptize } =
    user;
  const navigate = useNavigate();
  const liveActive = live ? "bg-primary-200" : "bg-primary-400";
  const checkActive = checked ? "bg-orange-300" : liveActive;
  const onClickHandler = useCallback(() => {
    if (onClick) {
      onClick(userIdx, checked, assigned);
    }
  }, [onClick]);
  const onProfileClickHandler = useCallback(() => {
    navigate(`/profile/${userIdx}`);
  }, [userIdx]);
  return (
    <Card
      className={`flex items-center space-x-4 text-md font-display p-1 mb-1 ${checkActive} ${className}`}
      onClick={onClickHandler}
    >
      <Profile
        key={userIdx}
        profile={profile}
        name={name}
        live={live}
        onClick={onProfileClickHandler}
      />
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
