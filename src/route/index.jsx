import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/Main";
import LoginPage from "../pages/Login";
import ProfilePage from "../pages/Profile";
import SettingPage from "../pages/Setting";
import CardPage from "../pages/Card";
import S13Page from "../pages/S-13";
import ViewPage from "../pages/View";
import NotFoundPage from "../pages/NotFound";

const RouteWrapper = (props) => {
  return (
    <BrowserRouter>
      {props.children}
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
    </BrowserRouter>
  );
};

export default RouteWrapper;
