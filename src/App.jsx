import React, { useEffect, useState } from "react";
import "./App.css";
import MarkBox from "./components/molecules/MarkBox";
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
  return <>
    {/* {users.length > 0 && <ProfileStack users={users} />} */}
    {/* {users.length > 0 && <Profile userIdx={users[0].userIdx} src={users[0].profile} name={users[0].name} live={users[0].live} />} */}
    {users.length > 0 && <ProfileCard user={users[0]} />}
    <MarkBox cardContentIdx={1}/>
  </>;
};

export default App;
