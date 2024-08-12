import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRout.tsx";
import LoginPage from "./app/Login/login.tsx";
import MainPage from "./app/dashboard/MainPage.tsx";
import UserProfile from "./app/UserProfile/UserProfile.tsx";
import NotFoundPage from "./app/404/404.tsx";
import PasswordRecovery from "./app/PasswordRecovery/passwordRecovery.tsx";
import SetNewPassword from "./app/PasswordRecovery/SetNewPassword.tsx";
import ResetLinkPassword from "./app/PasswordRecovery/ResetPasswordLink.tsx";
import { ToastComponent } from "./Shared/Components/ToastComponent.tsx";
import PublicRoute from "./utils/PublicRout.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <ToastComponent />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<LoginPage />} path="/login" />
          <Route element={<PasswordRecovery />} path="/passwordRecovery" />
          <Route element={<SetNewPassword />} path="/setNewPassword" />
          <Route element={<ResetLinkPassword />} path="/resetPasswordLink" />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<MainPage />} path="/dashboard" />
          <Route element={<UserProfile />} path="/user-profile" />
        </Route>
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </Router>
    <App />
  </React.StrictMode>,
);
