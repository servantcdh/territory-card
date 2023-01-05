import React from "react";
import Body from "../../atoms/Body";
import SpeedDial from "../../molecules/SpeedDial";

const Container = ({ className, children }) => {
  const onLogoutHandler = () => {
    console.log("logout");
  };
  return (
    <Body className={` ${className}`}>
      {children}
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
    </Body>
  );
};

export default Container;
