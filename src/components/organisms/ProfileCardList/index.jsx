import React, { useCallback, useState } from "react";
import Search from "../../atoms/Search";
import Modal from "../../molecules/Modal";
import ProfileCard from "../../molecules/ProfileCard";

const ProfileCardList = ({ users, userIdxes, onAssign, onSearch, onCancel, userIdx }) => {
  const [checkedUserIdx, setCheckedUserIdx] = useState(userIdxes);
  const [assignedUserIdx, setAssignedUserIdx] = useState(userIdx);
  const onConfirmHandler = useCallback(() => {
    onAssign({ userIdx: assignedUserIdx, userIdxes: checkedUserIdx });
  }, [onAssign, assignedUserIdx, checkedUserIdx]);
  const onCancelHandler = useCallback(() => {
    onCancel();
  }, [onCancel]);
  const onCheckProfileHandler = useCallback(
    (userIdx) => {
      let prev = [...checkedUserIdx];
      if (prev.includes(userIdx)) {
        prev = prev.filter((idx) => idx !== userIdx);
      } else {
        prev.push(userIdx);
      }
      if (prev.length && prev.includes(userIdx) && !assignedUserIdx) {
        setAssignedUserIdx(userIdx);
      }
      if (assignedUserIdx === userIdx) {
        return setAssignedUserIdx(0);
      }
      setCheckedUserIdx(prev);
    },
    [checkedUserIdx, setAssignedUserIdx, setCheckedUserIdx]
  );
  users.sort((_, curr) => userIdxes.includes(curr.userIdx) ? 1 : -1);
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
      buttonDisabled={!checkedUserIdx.length}
    >
      <Search
        className="fixed w-5/6 inset-x-0 mx-auto h-10 z-20"
        onSubmit={onSearchHandler}
      />
      <div className="mt-[55px]">
        {!!users.length &&
          users.map((u) => (
            <ProfileCard
              key={u.userIdx}
              className="rounded"
              user={u}
              checked={checkedUserIdx.includes(u.userIdx)}
              assigned={assignedUserIdx === u.userIdx}
              userIdx={userIdx}
              onClick={onCheckProfileHandler.bind(this)}
            />
          ))}
      </div>
    </Modal>
  );
};

export default ProfileCardList;
