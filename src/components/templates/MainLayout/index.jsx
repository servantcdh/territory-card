import React, { useState } from "react";
import Body from "../../atoms/Body";
import ProfileCard from "../../molecules/ProfileCard";
import Modal from "../../molecules/Modal";

const MainLayout = ({ userStatus, user, onChangeAccessHandler }) => {
  const [activeModal, setActiveModal] = useState(false);
  const onModalConfirmHandler = () => {
    setActiveModal(false);
    onChangeAccessHandler({
        live: true, car: true
    });
  };
  return (
    <Body>
      {userStatus === "success" && (
        <ProfileCard
          className="animate-showDown p-2 border-b-4 border-yellow-400 bg-amber-500"
          user={user}
        />
      )}
      {activeModal && user.driver && (
        <Modal
          title="차량을 가지고 오셨나요?"
          onConfirm={onModalConfirmHandler}
          buttonName="알려주기"
          buttonDisabled={false}
        ></Modal>
      )}
    </Body>
  );
};

export default MainLayout;
