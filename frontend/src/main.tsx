import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRout.tsx";
import LoginPage from "./Login/login.tsx";
import MainPage from "./app/MainPage.tsx";
import UserProfile from "./UserProfile/UserProfile.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <PrivateRoutes /> */}
        <Route element={<PrivateRoutes />}>
          <Route element={<MainPage />} path="/" />
          <Route element={<UserProfile />} path="/user-profile" />
        </Route>
        <Route Component={LoginPage} path="/login" />
      </Routes>
    </BrowserRouter>
    <App />
  </React.StrictMode>,
);
