import React, { useCallback, useState } from "react";
import Modal from "../../molecules/Modal";
import SearchUser from "../../molecules/SearchUser";
import ProfileCard from "../../molecules/ProfileCard";

const ProfileCardList = ({
  users,
  userIdxes,
  onAssign,
  onSearch,
  onCancel,
  userIdx,
}) => {
  const [checkedUserIdx, setCheckedUserIdx] = useState(userIdxes);
  const [assignedUserIdx, setAssignedUserIdx] = useState(userIdx);
  const [checkedUserPushTokens, setCheckedUserPushTokens] = useState([]);
  const onConfirmHandler = useCallback(() => {
    onAssign({
      userIdx: assignedUserIdx,
      userIdxes: checkedUserIdx,
      pushTokens: checkedUserPushTokens,
    });
  }, [onAssign, assignedUserIdx, checkedUserIdx, checkedUserPushTokens]);
  const onCancelHandler = useCallback(() => {
    onCancel();
  }, [onCancel]);
  const onCheckProfileHandler = useCallback(
    (userIdx, _, __, pushToken) => {
      let prev = [...checkedUserIdx];
      if (prev.includes(userIdx)) {
        prev = prev.filter((idx) => idx !== userIdx);
        onAddPushTokenHandler(pushToken, false);
      } else {
        prev.push(userIdx);
        if (!userIdxes.includes(userIdx) && pushToken) {
          onAddPushTokenHandler(pushToken, true);
        }
      }
      if (!isNaN(assignedUserIdx)) {
        if (prev.length && prev.includes(userIdx) && !assignedUserIdx) {
          setAssignedUserIdx(userIdx);
        }
        if (assignedUserIdx === userIdx) {
          setAssignedUserIdx(0);
        }
      }
      setCheckedUserIdx(prev);
    },
    [
      checkedUserIdx,
      setAssignedUserIdx,
      setCheckedUserIdx,
      onAddPushTokenHandler,
    ]
  );
  const onAddPushTokenHandler = useCallback(
    (pushToken, isPush) => {
      let prev = [...checkedUserPushTokens];
      if (!isPush) {
        prev = prev.filter((token) => token !== pushToken);
      } else {
        prev.push(pushToken);
      }
      setCheckedUserPushTokens(prev);
    },
    [checkedUserPushTokens, setCheckedUserPushTokens]
  );
  const onSearchHandler = useCallback(
    (keyword) => {
      onSearch(keyword);
    },
    [onSearch]
  );
  return (
    <Modal
      className="bg-amber-200"
      title="배정할 전도인 선택"
      onConfirm={onConfirmHandler}
      onCancel={onCancelHandler}
      buttonName="배정"
      cancelName="취소"
    >
      {onSearch && (
        <SearchUser
          className="fixed w-5/6 inset-x-0 mx-auto h-10 z-20 md:w-[470px] lg:w-[470px]"
          onSubmit={onSearchHandler}
        />
      )}
      <div className={`${onSearch ? "mt-[55px]" : ""}`}>
        {!!users.length &&
          users.map((u) => (
            <ProfileCard
              key={`profileCard_${u.userIdx}`}
              className="rounded"
              user={u}
              checked={checkedUserIdx.includes(u.userIdx)}
              assigned={assignedUserIdx ? assignedUserIdx === u.userIdx : false}
              userIdx={userIdx}
              onClick={onCheckProfileHandler}
            />
          ))}
      </div>
    </Modal>
  );
};

export default ProfileCardList;
