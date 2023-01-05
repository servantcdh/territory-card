import React, { useCallback, useEffect } from "react";
import "./App.css";
import {
  Routes,
  Route,
  useMatch,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useMutation } from "react-query";
import { getAccessToken, setAccessToken } from "./hooks/storage";
import { accessApi, refreshTokenApi, logoutApi } from "./hooks/api/auth";
import MainPage from "./pages/Main";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import SettingPage from "./pages/Setting";
import CardPage from "./pages/Card";
import S13Page from "./pages/S-13";
import ViewPage from "./pages/View";
import NotFoundPage from "./pages/NotFound";
import SpeedDial from "./components/molecules/SpeedDial";

const App = () => {
  const accessToken = getAccessToken();
  const accessMutation = useMutation(accessApi);
  const refreshTokenMutation = useMutation(refreshTokenApi);
  const logoutMutation = useMutation(logoutApi);
  const isLoginPage = useMatch("/login");
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const onLogoutHandler = () => {
    accessMutation.mutate({
      car: false,
      live: false,
    });
    setAccessToken(null);
    logoutMutation.mutate();
    navigate("/login");
  };
  const onSuccessRefreshToken = useCallback(({ accessToken }) => {
    setAccessToken(accessToken);
  });
  const onErrorRefreshToken = useCallback(() => {
    navigate("/login");
  });
  useEffect(() => {
    if (!isLoginPage) {
      if (!accessToken) {
        navigate("/login");
      } else {
        refreshTokenMutation.mutate(null, {
          onSuccess: onSuccessRefreshToken,
          onError: onErrorRefreshToken,
        });
      }
    }
  }, [pathname]);
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/card" element={<CardPage />} />
        <Route path="/s-13" element={<S13Page />} />
        <Route path="/view" element={<ViewPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
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
