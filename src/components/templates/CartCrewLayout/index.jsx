import React, { useCallback } from "react";
import Body from "../../atoms/Body";
import Button from "../../atoms/Button";
import Profile from "../../atoms/Profile";
import Container from "../../atoms/Container";
import KakaoMapButton from "../../atoms/KakaoMapButton";
import CartDayHeader from "../../molecules/CartDayHeader";
import TerritoryCard from "../../molecules/TerritoryCard";
import { useNavigate } from "react-router-dom";

const CartCrewLayout = ({
  cartDayIdx,
  cartDayTimeLocation,
  cartDayTimeUser,
  startTime,
  endTime,
}) => {
  const navigate = useNavigate();
  const onProfileClickHandler = useCallback((userIdx) => {
    navigate(`/profile/${userIdx}`);
  }, []);
  const onLocationClickHandler = useCallback(() => {
    navigate("/cartLocation");
  }, []);
  return (
    <Body className="animate-naviToUser font-display">
      <Container className="h-[calc(90vh)]">
        <TerritoryCard
          className="my-0 animate-fade before:top-6 before:bg-red-700"
          childClassName="-top-0 bg-amber-100"
          titleClassName="text-primary-800"
          title="전시대 참가자/구역관리"
        >
          <div className="h-[calc(100%-60px)] bg-gray-800 p-5 rounded-lg">
            <CartDayHeader dayCode={cartDayIdx - 1}>
              <Button
                className="text-xs px-1 mr-1 rounded-lg text-black"
                onClick={onLocationClickHandler}
              >
                구역관리
              </Button>
              <Button className="text-xs px-1 mr-1 rounded-lg text-black">
                구역배정
              </Button>
              <Button className="text-xs px-1 rounded-lg text-black">
                참가자 비우기
              </Button>
            </CartDayHeader>
            <div>
              {startTime} ~ {endTime}
            </div>
            <div className="bg-gray-700 mt-2 rounded p-3 h-[calc(100%-70px)] overflow-y-scroll scrollbar-hide">
              <div className="mb-2 bg-gray-900 rounded p-2">
                <div className="mb-2 text-lg">미배정</div>
                <div className="pb-1">
                  {!!cartDayTimeUser.length &&
                    cartDayTimeUser.map((timeUser) => {
                      const { user, userIdx } = timeUser;
                      const { access } = user;
                      return (
                        <Profile
                          className="mr-[2px] w-[40px] h-[40px]"
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
                        <div className="mb-2 text-lg w-[calc(100%-165px)]">
                          {locationName}
                        </div>
                        <div className="mt-0.5 w-[165px] text-xs text-right">
                          <KakaoMapButton
                            className="border-none bg-yellow-400 text-black px-1 mr-1"
                            dest={locationName}
                            latlng={{
                              lat,
                              lng,
                            }}
                          >
                            카카오내비
                          </KakaoMapButton>
                          <Button className="border-none bg-gray-800 px-1 mr-1">
                            전도인배정
                          </Button>
                          <Button className="border-none bg-gray-800 px-1">
                            구역삭제
                          </Button>
                        </div>
                      </div>
                      <div className="pb-1">
                        {!!cartCrewAssigned.length &&
                          cartCrewAssigned.map((crew) => {
                            const { cartDayTimeUser } = crew;
                            const { user, userIdx } = cartDayTimeUser;
                            const { access } = user;
                            return (
                              <Profile
                                className="mr-[2px] w-[40px] h-[40px]"
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
