import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Body from "../../atoms/Body";
import Button from "../../atoms/Button";
import Profile from "../../atoms/Profile";
import Container from "../../atoms/Container";
import KakaoMap from "../../atoms/KakaoMap";
import KakaoMapButton from "../../atoms/KakaoMapButton";
import Modal from "../../molecules/Modal";
import CartDayHeader from "../../molecules/CartDayHeader";
import TerritoryCard from "../../molecules/TerritoryCard";

const CartCrewLayout = ({
  cartDayTimeIdx,
  cartDayIdx,
  cartDayTimeLocation,
  cartDayTimeUser,
  startTime,
  endTime,
  locations,
  onAssign,
  onCreate,
  onDelete,
  onReset,
}) => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [latlng, setLatlng] = useState(null);
  const onProfileClickHandler = useCallback((userIdx) => {
    navigate(`/profile/${userIdx}`);
  }, []);
  const onLocationClickHandler = useCallback(() => {
    navigate("/cartLocation");
  }, []);
  const onCreateTimeLocationHandler = useCallback(() => {
    const { idx: cartLocationIdx } = selectedLocation;
    onCreate({
      cartLocationIdx,
      cartDayTimeIdx,
    });
    setActiveModal(false);
    setSelectedLocation(null);
  }, [selectedLocation, cartDayTimeIdx]);
  const onDeleteTimeLocationHandler = useCallback((cartDayTimeLocationIdx) => {
    onDelete({
      cartDayTimeLocationIdx,
    });
  }, []);
  const onResetClickHandler = useCallback(() => {
    onReset({ cartDayTimeIdx });
  }, [cartDayTimeIdx]);
  const onClickModalHandler = useCallback(() => {
    setActiveModal(true);
  }, []);
  const onCloseModalHandler = useCallback(() => {
    setActiveModal(false);
    setSelectedLocation(null);
  }, []);
  const onClickLocationHandler = useCallback((location) => {
    setSelectedLocation((prevState) => {
      if (prevState && prevState.idx === location.idx) {
        return null;
      }
      return location;
    });
  }, []);
  useEffect(() => {
    if (!selectedLocation) {
      return;
    }
    setLatlng({
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
    });
  }, [selectedLocation]);
  return (
    <Body className="animate-naviToUser font-display">
      {activeModal && (
        <Modal
          className="bg-amber-200"
          title="전시대 구역을 선택하세요."
          onConfirm={onCreateTimeLocationHandler}
          onCancel={onCloseModalHandler}
          buttonName="배정"
          cancelName="취소"
          buttonDisabled={!selectedLocation}
        >
          <div className="mt-1 max-h-[200px] p-2 bg-gray-900 rounded overflow-y-scroll scrollbar-hide mb-3">
            {!!locations.length &&
              locations.map((location) => {
                const selected = selectedLocation
                  ? selectedLocation.idx === location.idx
                  : false;
                return (
                  <div
                    key={location.idx}
                    onClick={onClickLocationHandler.bind(null, location)}
                  >
                    <div
                      className={`text-primary-100 text-lg w-full ${
                        selected ? "bg-gray-700" : ""
                      }`}
                    >
                      <p className="m-1">{location.name}</p>
                    </div>
                  </div>
                );
              })}
          </div>
          <KakaoMap className="w-full h-[200px] rounded" latlng={latlng} />
        </Modal>
      )}
      <Container className="h-[calc(90vh)]">
        <TerritoryCard
          className="my-0 animate-fade before:top-6 before:bg-red-700"
          childClassName="-top-0 bg-amber-100"
          titleClassName="text-primary-800"
          title="전시대 배정"
        >
          <div className="h-[calc(100%-60px)] bg-gray-800 p-5 rounded-lg">
            <CartDayHeader dayCode={cartDayIdx - 1}>
              <Button
                className="text-xs px-1 mr-1 rounded-lg text-black"
                onClick={onLocationClickHandler}
              >
                구역관리
              </Button>
              <Button
                className="text-xs px-1 mr-1 rounded-lg bg-rose-400 text-black"
                onClick={onClickModalHandler}
              >
                구역배정
              </Button>
              <Button
                className="text-xs px-1 rounded-lg text-black"
                onClick={onResetClickHandler}
              >
                참가자 비우기
              </Button>
            </CartDayHeader>
            <div>
              {startTime} ~ {endTime}
            </div>
            <div className="bg-gray-700 mt-2 rounded p-3 h-[calc(100%-70px)] overflow-y-scroll scrollbar-hide">
              <div className="mb-2 bg-gray-900 rounded p-2">
                <div className="mb-2 text-lg">구역을 배정하지 않음</div>
                <div className="pb-1 flex flex-wrap">
                  {!!cartDayTimeUser.length &&
                    cartDayTimeUser.map((timeUser) => {
                      const { user, userIdx } = timeUser;
                      const { access } = user;
                      return (
                        <Profile
                          className="mr-[5px] w-[40px] h-[40px] mb-1"
                          liveClassName="left-[1.8rem]"
                          key={`timeUser_${userIdx}`}
                          {...user}
                          {...access}
                          onClick={onProfileClickHandler.bind(null, userIdx)}
                        />
                      );
                    })}
                </div>
              </div>
              {!!cartDayTimeLocation.length &&
                cartDayTimeLocation.map((timeLocation) => {
                  const { idx, cartLocation, cartCrewAssigned } = timeLocation;
                  const { name: locationName, lat, lng } = cartLocation;
                  return (
                    <div
                      key={`location_${idx}`}
                      className="mb-2 bg-gray-900 rounded p-2"
                    >
                      <div className="flex">
                        <div className="mb-2 text-lg w-[calc(100%-150px)]">
                          {locationName}
                        </div>
                        <div className="mt-0.5 w-[150px] text-xs text-right">
                          <KakaoMapButton
                            className="border bg-yellow-400 text-black px-1 mr-1"
                            dest={locationName}
                            latlng={{
                              lat,
                              lng,
                            }}
                          >
                            카카오내비
                          </KakaoMapButton>
                          <Button className="border bg-rose-400 text-black px-1 mr-1">
                            전도인배정
                          </Button>
                          <Button
                            className="border text-black px-1"
                            onClick={onDeleteTimeLocationHandler.bind(
                              null,
                              idx
                            )}
                          >
                            삭제
                          </Button>
                        </div>
                      </div>
                      <div className="pb-1 flex flex-wrap">
                        {!!cartCrewAssigned.length &&
                          cartCrewAssigned.map((crew) => {
                            const { cartDayTimeUser } = crew;
                            const { user, userIdx } = cartDayTimeUser;
                            const { access } = user;
                            return (
                              <Profile
                                className="mr-[5px] w-[40px] h-[40px] mb-1"
                                liveClassName="left-[1.8rem]"
                                key={`crew_${userIdx}`}
                                {...user}
                                {...access}
                                onClick={onProfileClickHandler.bind(
                                  null,
                                  userIdx
                                )}
                              />
                            );
                          })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </TerritoryCard>
      </Container>
    </Body>
  );
};

export default CartCrewLayout;
