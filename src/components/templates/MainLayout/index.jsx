import React, { useCallback, useEffect, useState } from "react";
import Body from "../../atoms/Body";
import ProfileCard from "../../molecules/ProfileCard";
import Modal from "../../molecules/Modal";
import Card from "../../atoms/Card";
import Button from "../../atoms/Button";
import CardLabelBox from "../../organisms/CardLabelBox";

const MainLayout = ({
  myInfoStatus,
  myInfo,
  onChangeAccess,
  myCardStatus,
  myCard,
}) => {
  const isDriver = !!(myInfo && myInfo.driver);
  const isMale = !!(myInfo && myInfo.gender);
  const hasCar = !!(myInfo && myInfo.car);
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
    <Body className="overflow-y-scroll">
      {myInfoStatus === "success" && (
        <ProfileCard
          className={`animate-showDown p-2 border-b-4 border-yellow-400 bg-amber-500`}
          user={myInfo}
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
              <p>자동차를 가져오셨나요?</p>
            </div>
            <div className="text-8xl">
              <Button
                className={`border-0 mr-2 hover:bg-orange-400 ${
                  checkedCar ? "" : "bg-primary-400"
                }`}
                onClick={onClickHasCarHandler}
              >
                🚗
              </Button>
              <Button
                className={`border-0 mr-2 hover:bg-orange-400 ${
                  !checkedCar ? "" : "bg-primary-400"
                }`}
                onClick={onClickNoCarHandler}
              >
                {isMale ? "🚶🏻‍♂️" : "🚶🏻‍♀️"}
              </Button>
            </div>
          </Card>
        </Modal>
      )}
      {myCardStatus === "success" && <CardLabelBox items={myCard} />}
    </Body>
  );
};

export default MainLayout;
