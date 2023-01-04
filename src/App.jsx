import React, { useEffect, useState } from "react";
import "./App.css";
import MarkBox from "./components/organisms/MarkBox";
import Modal from "./components/molecules/Modal";
import ProfileCard from "./components/molecules/ProfileCard";
import ProfileCardList from "./components/organisms/ProfileCardList";
import SpeedDial from "./components/molecules/SpeedDial";
import RouteWrapper from "./route";

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
      car: true,
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
  // const [users, setUsers] = useState([]);
  // useEffect(() => {
  //   const fetchs = async () => {
  //     const token = await login();
  //     access(token);
  //     const users = await getUsers(token);
  //     setUsers(users);
  //   };
  //   fetchs();
  // }, []);
  // const [isActiveModal, setIsActiveModal] = useState(true);
  // const onAssignHandler = (crews) => {
  //   console.log(crews);
  //   setIsActiveModal(false);
  // };
  // const onSearchHandler = (keyword) => {
  //   console.log(keyword);
  // };
  const onLogoutHandler = () => {
    console.log('logout');
  };
  return (
    <>
      {/* {!!users.length && <ProfileStack users={users} />} */}
      {/* {!!users.length && <Profile userIdx={users[0].userIdx} src={users[0].profile} name={users[0].name} live={users[0].live} />} */}
      {/* {!!users.length && <ProfileCard user={users[0]} />} */}
      {/* <MarkBox cardContentIdx={1}/> */}
      <RouteWrapper>
        <SpeedDial
          items={[
            { route: "/", svg: "home" },
            { route: "/card", svg: "table" },
            { route: "/s-13", svg: "document-text" },
            { route: "/profile", svg: "user-circle" },
            { route: "/setting", svg: "cog" },
            { callback: onLogoutHandler, svg: "logout" },
          ]}
        />
      </RouteWrapper>
    </>
  );
};

export default App;
