import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRout.tsx";
import LoginPage from "./app/Login/login.tsx";
import MainPage from "./app/MainPage.tsx";
import UserProfile from "./app/UserProfile/UserProfile.tsx";
import NotFoundPage from "./app/404/404.tsx";
import PasswordRecovery from "./app/PasswordRecovery/passwordRecovery.tsx";
import SetNewPassword from "./app/PasswordRecovery/SetNewPassword.tsx";
import ResetLinkPassword from "./app/PasswordRecovery/ResetPasswordLink.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <PrivateRoutes /> */}
        <Route element={<PrivateRoutes />}>
          <Route element={<MainPage />} path="/" />
          <Route element={<UserProfile />} path="/user-profile" />
        </Route>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<NotFoundPage />} path="*" />
        <Route element={<PasswordRecovery />} path="/passwordRecovery" />
        <Route element={<SetNewPassword />} path="/SetNewPassword" />
        <Route element={<ResetLinkPassword />} path="/ResetPasswordLink" />
      </Routes>
    </BrowserRouter>
    <App />
  </React.StrictMode>,
);
