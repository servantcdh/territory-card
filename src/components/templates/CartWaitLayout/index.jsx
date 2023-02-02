import React, { useCallback } from "react";
import Body from "../../atoms/Body";
import Button from "../../atoms/Button";
import Profile from "../../atoms/Profile";
import Container from "../../atoms/Container";
import CartDayHeader from "../../molecules/CartDayHeader";
import TerritoryCard from "../../molecules/TerritoryCard";
import { useNavigate } from "react-router-dom";

const CartWaitLayout = ({
  cartDayIdx,
  cartDayTimeUser,
  cartDayTimeUserIdx,
  startTime,
  endTime,
  onDelete,
}) => {
  const navigate = useNavigate();
  const onProfileClickHandler = useCallback((userIdx) => {
    navigate(`/profile/${userIdx}`);
  }, []);
  const onDeletePlanUserHandler = useCallback(() => {
    onDelete({ cartDayTimeUserIdx });
  }, [cartDayTimeUserIdx]);
  return (
    <Body className="animate-naviToUser font-display">
      <Container className="h-[calc(90vh)]">
        <TerritoryCard
          className="my-0 animate-fade before:top-6 before:bg-red-700"
          childClassName="-top-0 bg-amber-100"
          titleClassName="text-primary-800"
          title="전시대 대기실"
        >
          <div className="h-[calc(100%-60px)] bg-gray-800 p-5 rounded-lg">
            <CartDayHeader dayCode={cartDayIdx - 1}>
              <Button
                className="text-xs px-1 rounded-lg text-black"
                onClick={onDeletePlanUserHandler}
              >
                퇴장하기
              </Button>
            </CartDayHeader>
            <div>
              {startTime} ~ {endTime}
            </div>
            <div className="bg-gray-700 mt-2 rounded p-3 h-[calc(100%-70px)] overflow-y-scroll scrollbar-hide">
              <div className="text-center my-10">
                <p className="text-2xl mb-2 animate-pulse">배정대기중</p>
                <p>전시대 봉사에 참여해주셔서 감사합니다.</p>
                <p>인도자가 구역을 배정해드릴 예정입니다.</p>
              </div>
              <div className="mb-2 bg-gray-900 rounded p-2">
                <div className="p-1 flex flex-wrap">
                  {!!cartDayTimeUser.length &&
                    cartDayTimeUser.map((timeUser) => {
                      const { user, userIdx } = timeUser;
                      const { access } = user;
                      return (
                        <Profile
                          className="mr-[5px] w-[40px] h-[40px] mb-2"
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
            </div>
          </div>
        </TerritoryCard>
      </Container>
    </Body>
  );
};

export default CartWaitLayout;
