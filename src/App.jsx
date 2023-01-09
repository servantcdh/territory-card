import React, { useCallback, useEffect } from "react";
import "./App.css";
import { Routes, Route, useMatch, useNavigate } from "react-router-dom";
import { useQueryClient, useQueries } from "@tanstack/react-query";
import { getAccessToken, setAccessToken } from "./hooks/storage";
import useAccessMutation from "./hooks/query/auth/useAccessMutation";
import useRefreshMutation from "./hooks/query/auth/useRefreshTokenMutation";
import useLogoutMutation from "./hooks/query/auth/useLogoutMutation";
import MainPage from "./pages/Main";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import SettingPage from "./pages/Setting";
import CardPage from "./pages/Card";
import S13Page from "./pages/S-13";
import ViewPage from "./pages/View";
import NotFoundPage from "./pages/NotFound";
import SpeedDial from "./components/molecules/SpeedDial";
import { myInfoApi } from "./hooks/api/user";

const App = () => {
  const queryClient = useQueryClient();
  const accessToken = getAccessToken();
  const { mutate: accessMutate } = useAccessMutation();
  const { mutate: refreshMutate } = useRefreshMutation();
  const { mutate: logoutMutate } = useLogoutMutation();
  const results = useQueries({
    queries: [
      {
        queryKey: ["myInfo"],
        queryFn: myInfoApi,
        refetchOnMount: "always",
        enabled: !!accessToken,
      },
    ],
  });
  const { data: myInfo } = results[0];
  const { car, auth, guide } = myInfo ? myInfo : { car: 0, auth: 0, guide: 0 };
  const hasCar = !!car;
  const activeAuthMenu = !!auth || !!guide;
  const isLoginPage = useMatch("/login");
  const navigate = useNavigate();
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
    queryClient.invalidateQueries(["myInfo"]);
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
    window.addEventListener("beforeunload", () => {
      accessMutate({
        car: false,
        live: false,
      });
    });
  }, [accessToken, hasCar]);
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
        {activeAuthMenu && (
          <>
            <Route path="/card" element={<CardPage />} />
            <Route path="/s-13" element={<S13Page />} />
          </>
        )}
        <Route path="/view">
          <Route path=":cardIdx/:cardAssignedIdx" element={<ViewPage />} />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      {!isLoginPage && (
        <SpeedDial
          items={[
            { route: "/", svg: "home" },
            ...(!activeAuthMenu ? [] : [
              { route: "/card", svg: "table" },
              { route: "/s-13", svg: "document-text" },
            ]),
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
