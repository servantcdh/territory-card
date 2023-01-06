import React, { useCallback, useEffect, useState } from "react";
import Body from "../../atoms/Body";
import ProfileCard from "../../molecules/ProfileCard";
import Modal from "../../molecules/Modal";
import Card from "../../atoms/Card";
import Button from "../../atoms/Button";

const MainLayout = ({ userStatus, user, onChangeAccess }) => {
  const isDriver = !!(user && user.driver);
  const isMale = !!(user && user.gender);
  const hasCar = !!(user && user.car);
  const [activeModal, setActiveModal] = useState(false);
  const [checkedCar, setCheckedCar] = useState(isDriver);
  const onModalConfirmHandler = useCallback(() => {
    setActiveModal(false);
    onChangeAccess({
      live: true,
      car: checkedCar,
    });
  }, [setActiveModal, onChangeAccess, checkedCar]);
  const onClickHasCarHandler = useCallback(() => {
    setCheckedCar(true);
  }, [setCheckedCar]);
  const onClickNoCarHandler = useCallback(() => {
    setCheckedCar(false);
  }, [setCheckedCar]);
  useEffect(() => {
    setActiveModal(isDriver && !hasCar);
  }, [setActiveModal, isDriver, hasCar]);
  return (
    <Body>
      {userStatus === "success" && (
        <ProfileCard
          className={`animate-showDown p-2 border-b-4 border-yellow-400 bg-amber-500`}
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
          <Card className="bg-gray-100 rounded text-center">
            <div className="text-lg mb-3">
              <p>오늘은 자동차를 가지고 오셨나요?</p>
            </div>
            <div className="text-8xl ">
              <Button
                className={`border-0 mr-2 ${checkedCar ? "" : "bg-primary-400"}`}
                onClick={onClickHasCarHandler}
              >
                🚗
              </Button>
              <Button
                className={`border-0 mr-2 ${!checkedCar ? "" : "bg-primary-400"}`}
                onClick={onClickNoCarHandler}
              >
                {isMale ? "🚶🏻‍♂️" : "🚶🏻‍♀️"}
              </Button>
            </div>
          </Card>
        </Modal>
      )}
    </Body>
  );
};

export default MainLayout;
