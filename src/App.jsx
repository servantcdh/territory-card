import React from "react";
import "./App.css";
import SpeedDial from "./components/molecules/SpeedDial";
import { useMatch } from "react-router-dom";

const App = () => {
  const isLoginPage = useMatch("/login");
  const onLogoutHandler = () => {
    console.log("logout");
  };
  return (
    <>
      {!isLoginPage && (
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
      )}
    </>
  );
};

export default App;
