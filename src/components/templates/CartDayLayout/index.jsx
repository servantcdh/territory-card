import React, { useCallback } from "react";
import Body from "../../atoms/Body";
import Button from "../../atoms/Button";
import Profile from "../../atoms/Profile";
import Container from "../../atoms/Container";
import CartDayHeader from "../../molecules/CartDayHeader";
import TerritoryCard from "../../molecules/TerritoryCard";
import CartDayTimeEdit from "../../molecules/CartDayTimeEdit";
import { useNavigate } from "react-router-dom";

const CartDayLayout = ({
  cartDayIdx,
  dayCode,
  items,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const navigate = useNavigate();
  const onProfileClickHandler = useCallback((userIdx) => {
    navigate(`/profile/${userIdx}`);
  }, []);
  const onCrewClickHandler = useCallback((cartDayTimeIdx) => {
    navigate(`/cartCrew/${cartDayTimeIdx}`);
  }, []);
  const onEditModeChangeHandler = useCallback((time) => {
    onUpdate(time);
  }, []);
  const onCreateHandler = useCallback(() => {
    let start = "오전 9:00";
    let end = "오전 10:00";
    if (items.length) {
      const { startTime } = items[items.length - 1];
      const startArr = startTime.split(" ");
      const startHour = +startArr[1].split(":")[0];
      const add = startArr[0] === "오후" ? 12 : 0;
      const nextHour = add + startHour + 1;
      if (nextHour > 23) {
        return;
      }
      const isAM = nextHour < 12;
      const nextHour12 = nextHour - 12;
      const nextEndHour = nextHour + 1;
      if (nextEndHour > 23) {
        return;
      }
      const endIsAM = nextEndHour < 12;
      const nextEndHour12 = nextEndHour - 12;
      start = `${isAM ? "오전" : "오후"} ${
        isAM ? nextHour : !nextHour12 ? 12 : nextHour12
      }:00`;
      end = `${endIsAM ? "오전" : "오후"} ${
        endIsAM ? nextEndHour : !nextEndHour12 ? 12 : nextEndHour12
      }:00`;
    }
    onCreate({
      cartDayIdx,
      startTime: start,
      endTime: end,
    });
  }, [cartDayIdx, items]);
  const onDeleteHandler = useCallback((cartDayTimeIdx) => {
    onDelete({
      cartDayTimeIdx,
    });
  }, []);
  return (
    <Body className="animate-naviToUser font-display">
      <Container className="h-[calc(90vh)]">
        <TerritoryCard
          className="my-0 animate-fade before:top-6 before:bg-red-700"
          childClassName="-top-0 bg-amber-100"
          titleClassName="text-primary-800"
          title="전시대 일정"
        >
          <div className="h-[calc(100%-60px)] bg-gray-800 p-5 rounded-lg">
            <CartDayHeader dayCode={dayCode}>
              <Button
                className="text-sm px-1 rounded-lg text-black"
                onClick={onCreateHandler}
              >
                타임생성
              </Button>
            </CartDayHeader>
            <div className="bg-gray-700 mt-2 rounded p-3 h-[calc(100%-50px)] overflow-y-scroll scrollbar-hide">
              {!!items.length &&
                items.map((time) => {
                  const { idx, startTime, endTime, cartDayTimeUser } = time;
                  return (
                    <div
                      key={idx}
                      className="w-full bg-amber-100 mb-3 p-2 text-black rounded"
                    >
                      <div className="flex mb-1">
                        <div className="text-xs tracking-tighter w-[calc(100%-61px)] mt-1">
                          <div className="flex">
                            <CartDayTimeEdit
                              idx={idx}
                              timeString={startTime}
                              anotherString={endTime}
                              isStart={true}
                              onChange={onEditModeChangeHandler}
                            />
                            <p className="mx-1.5 ml-1 leading-[19px]">~</p>
                            <CartDayTimeEdit
                              idx={idx}
                              timeString={endTime}
                              anotherString={startTime}
                              isStart={false}
                              onChange={onEditModeChangeHandler}
                            />
                          </div>
                        </div>
                        <div className="w-[61px] text-xs text-right mt-0.5">
                          <Button
                            className="border-none bg-rose-400 px-1 mr-1"
                            onClick={onCrewClickHandler.bind(null, idx)}
                          >
                            배정
                          </Button>
                          <Button
                            className="border-none bg-gray-400 px-1"
                            onClick={onDeleteHandler.bind(null, idx)}
                          >
                            삭제
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-wrap overflow-y-scroll scrollbar-hide">
                        {!!cartDayTimeUser.length &&
                          cartDayTimeUser.map((timeUser) => {
                            const { user, userIdx } = timeUser;
                            const { access } = user;
                            return (
                              <Profile
                                className="mr-[5px] w-[40px] h-[40px] mb-2"
                                liveClassName="left-[1.8rem]"
                                key={user.idx}
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

export default CartDayLayout;
