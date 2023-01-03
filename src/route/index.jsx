import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import MainPage from "../pages/main";

const Route = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Route;
