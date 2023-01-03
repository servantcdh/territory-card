import React, { useEffect, useState } from "react";
import "./App.css";
import MarkBox from "./components/molecules/MarkBox";
import Modal from "./components/molecules/Modal";
import ProfileCard from "./components/molecules/ProfileCard";

const login = async () => {
  const response = await fetch(`http://localhost:3000/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "최동호",
      password: "1234",
    }),
  });
  const { accessToken } = await response.json();
  return accessToken;
};

const access = async (accessToken) => {
  const response = await fetch(`http://localhost:3000/auth/access`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      car: false,
      live: true,
    }),
  });
  return response.json();
};

const getUsers = async (accessToken) => {
  const response = await fetch(`http://localhost:3000/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.json();
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [isActiveModal, setIsActiveModal] = useState(true);
  useEffect(() => {
    const fetchs = async () => {
      const token = await login();
      access(token);
      const users = await getUsers(token);
      setUsers(users);
    };
    fetchs();
    return () => {
      console.log("clean up");
    };
  }, []);
  const modalConfirmController = () => {
    setIsActiveModal(false);
  };
  const message = `가룟 유다는 탐욕 때문에 파렴치한 배신자가 되었습니다. 하지만 그가 처음부터 나쁜 사람이었던 것은 아닙니다. (누가 6:13, 16) 유다가 돈궤를 맡았던 것을 보면 그는 유능하고 믿을 만한 사람이었을 것입니다. 하지만 어느 순간부터 유다는 탐욕을 멀리하라는 예수의 반복적인 말씀에도 불구하고 그 돈을 훔치기 시작했습니다. (마가 7:22, 23; 누가 11:39) 유다의 탐욕은 예수께서 처형되시기 얼마 전에 일어난 사건을 통해 분명히 드러났습니다. 예수께서는 마리아와 그의 자매 마르다와 그 밖의 제자들과 함께 나병 환자 시몬의 집에 초대받으셨습니다. 식사 중에 마리아가 일어나 예수의 머리에 값비싼 향유를 부었습니다. 그 모습을 보고 유다와 몇몇 제자들은 몹시 화를 냈습니다. 그 제자들은 그 돈을 봉사에서 더 유용하게 사용할 수 있었을 것이라고 생각했을지 모릅니다. 하지만 유다가 화를 낸 것은 다른 이유 때문이었습니다. “도둑이었던” 그는 궤에서 더 많은 돈을 훔치고 싶어 했습니다.—요한 12:2-6; 마태 26:6-16; 누가 22:3-6. 「파21.06」 18면 12-13항`;
  return (
    <>
      {/* {users.length > 0 && <ProfileStack users={users} />} */}
      {/* {users.length > 0 && <Profile userIdx={users[0].userIdx} src={users[0].profile} name={users[0].name} live={users[0].live} />} */}
      {users.length > 0 && <ProfileCard user={users[0]} />}
      <MarkBox cardContentIdx={1} />
      {isActiveModal && (
        <Modal
          title="일용할 성구"
          message={message}
          onConfirm={modalConfirmController}
        />
      )}
    </>
  );
};

export default App;
