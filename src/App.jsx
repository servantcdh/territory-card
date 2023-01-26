import React, { useCallback, useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useMatch, useNavigate } from "react-router-dom";
import { useQueryClient, useQueries } from "@tanstack/react-query";
import { getAccessToken, setAccessToken } from "./hooks/storage";
import { myInfoApi } from "./hooks/api/user";
import useAccessMutation from "./hooks/query/auth/useAccessMutation";
import useRefreshMutation from "./hooks/query/auth/useRefreshTokenMutation";
import useLogoutMutation from "./hooks/query/auth/useLogoutMutation";
import useFCM from "./hooks/firebase/useFCM";

const MainPage = lazy(() => import("./pages/Main"));
const LoginPage = lazy(() => import("./pages/Login"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const SettingPage = lazy(() => import("./pages/Setting"));
const CardPage = lazy(() => import("./pages/Card"));
const S13Page = lazy(() => import("./pages/S-13"));
const UserPage = lazy(() => import("./pages/User"));
const UserCreatePage = lazy(() => import("./pages/UserCreate"));
const ViewPage = lazy(() => import("./pages/View"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

import SpeedDial from "./components/molecules/SpeedDial";

const App = () => {
  const [pushToken, setPushToken] = useState("");
  // const [notification, setNotification] = useState({ title: "", body: "" });
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
  const { fcmToken, onMessageListener } = useFCM();
  fcmToken().then((token) => {
    setPushToken(token);
  });
  onMessageListener().then(({ notification }) => {
    // setNotification(notification);
  });
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
  const onAddListeners = useCallback(() => {
    window.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        accessMutate({
          car: false,
          live: false,
        });
      } else {
        accessMutate({
          car: hasCar,
          live: true,
        });
      }
    });
    window.addEventListener("beforeunload", () => {
      accessMutate({
        car: false,
        live: false,
      });
    });
    window.addEventListener("pagehide", () => {
      accessMutate({
        car: hasCar,
        live: false,
      });
    });
  }, [accessMutate, hasCar]);
  const onRemoveListeners = useCallback(() => {
    window.removeEventListener("visibilitychange", () => {
      if (document.hidden) {
        accessMutate({
          car: false,
          live: false,
        });
      } else {
        accessMutate({
          car: hasCar,
          live: true,
        });
      }
    });
    window.removeEventListener("beforeunload", () => {
      accessMutate({
        car: false,
        live: false,
      });
    });
    window.removeEventListener("pagehide", () => {
      accessMutate({
        car: hasCar,
        live: false,
      });
    });
  }, [accessMutate]);
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    } else {
      accessMutate(
        {
          car: hasCar,
          live: true,
          pushToken,
        },
        {
          onSuccess: onSuccessAccessMutation,
          // accessToken 만료
          onError: onFailAccessMutation,
        }
      );
    }
    onAddListeners();
    return () => {
      onRemoveListeners();
    };
  }, [accessToken, pushToken, hasCar, onAddListeners, onRemoveListeners]);
  return (
    <Suspense fallback={<div>불러오는 중...</div>}>
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
            <Route path="/user" element={<UserPage />} />
            <Route path="/user/new" element={<UserCreatePage />} />
          </>
        )}
        <Route path="/view">
          <Route path=":cardIdx/:cardAssignedIdx" element={<ViewPage />} />
          <Route path=":cardIdx" element={<ViewPage />} />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      {!isLoginPage && (
        <SpeedDial
          items={[
            { route: "/", svg: "home" },
            ...(!activeAuthMenu
              ? []
              : [
                  { route: "/card", svg: "table" },
                  { route: "/s-13", svg: "document-text" },
                  { route: "/user", svg: "user-group" },
                ]),
            { route: "/profile/me", svg: "user-circle" },
            // { route: "/setting/me", svg: "cog" },
            { callback: onLogoutHandler, svg: "logout" },
          ]}
        />
      )}
    </Suspense>
  );
};

export default App;
