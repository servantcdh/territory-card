import React, { useState } from "react";
import Body from "../../atoms/Body";
import ProfileCard from "../../molecules/ProfileCard";
import Modal from "../../molecules/Modal";
import Card from "../../atoms/Card";

const MainLayout = ({ userStatus, user, onChangeAccessHandler }) => {
  const [activeModal, setActiveModal] = useState(user && !!user.driver);
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
      {activeModal && (
        <Modal
          title="운전자이시군요!🪪"
          onConfirm={onModalConfirmHandler}
          buttonName="알려주기"
          buttonDisabled={false}
        >
          <Card className="bg-gray-100 rounded"></Card>
        </Modal>
      )}
    </Body>
  );
};

export default MainLayout;
