import React, { useCallback, useEffect } from "react";
import "./App.css";
import {
  Routes,
  Route,
  useMatch,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useQueryClient } from "react-query";
import { getAccessToken, setAccessToken } from "./hooks/storage";
import useAccessMutation from "./hooks/query/auth/useAccessMutation";
import useRefreshMutation from "./hooks/query/auth/useRefreshTokenMutation";
import useLogoutMutation from "./hooks/query/auth/useLogoutMutation";
import useMyInfoQuery from "./hooks/query/user/useMyInfoQuery";
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
  const queryClient = useQueryClient();
  const accessToken = getAccessToken();
  const { mutate: accessMutate } = useAccessMutation();
  const { mutate: refreshMutate } = useRefreshMutation();
  const { mutate: logoutMutate } = useLogoutMutation();
  const { data: myInfo } = useMyInfoQuery();
  const hasCar = !!myInfo && !!myInfo.car;
  const isLoginPage = useMatch("/login");
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const onLogoutHandler = useCallback(() => {
    accessMutate({
      car: false,
      live: false,
    });
    setAccessToken(null);
    logoutMutate();
    navigate("/login");
  }, [accessMutate, setAccessToken, logoutMutate, navigate]);
  const onSuccessAccessMutation = useCallback(() => {
    queryClient.invalidateQueries("myInfo");
  }, []);
  const onFailAccessMutation = useCallback(() => {
    // token 갱신
    refreshMutate(null, {
      onSuccess: onSuccessRefreshToken,
      onError: onErrorRefreshToken,
    });
  }, [refreshMutate, onSuccessRefreshToken, onErrorRefreshToken]);
  const onSuccessRefreshToken = useCallback(
    ({ accessToken }) => {
      setAccessToken(accessToken);
      accessMutate(
        {
          car: hasCar,
          live: true,
        },
        {
          onSuccess: onSuccessAccessMutation,
        }
      );
    },
    [setAccessToken, accessMutate, onSuccessAccessMutation, hasCar]
  );
  const onErrorRefreshToken = useCallback(() => {
    setAccessToken(null);
    navigate("/login");
  }, [setAccessToken, navigate]);
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    } else {
      accessMutate(
        {
          car: hasCar,
          live: true,
        },
        {
          onSuccess: onSuccessAccessMutation,
          // accessToken 만료
          onError: onFailAccessMutation,
        }
      );
    }
  }, [pathname, hasCar]);
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile">
          <Route path=":userIdx" element={<ProfilePage />} />
          <Route path="me" element={<ProfilePage />} />
        </Route>
        <Route path="/setting">
          <Route path=":userIdx" element={<SettingPage />} />
          <Route path="me" element={<SettingPage />} />
        </Route>
        <Route path="/card" element={<CardPage />} />
        <Route path="/s-13" element={<S13Page />} />
        <Route path="/view">
          <Route path=":cardIdx/:cardAssignedIdx" element={<ViewPage />} />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      {!isLoginPage && (
        <SpeedDial
          items={[
            { route: "/", svg: "home" },
            { route: "/card", svg: "table" },
            { route: "/s-13", svg: "document-text" },
            { route: "/profile/me", svg: "user-circle" },
            { route: "/setting/me", svg: "cog" },
            { callback: onLogoutHandler, svg: "logout" },
          ]}
        />
      )}
    </>
  );
};

export default App;
