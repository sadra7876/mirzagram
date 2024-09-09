import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRout.tsx";
import LoginPage from "./app/Login/login.tsx";
import UserProfile from "./app/UserProfile/UserProfile.tsx";
import NotFoundPage from "./app/404/404.tsx";
import PasswordRecovery from "./app/PasswordRecovery/passwordRecovery.tsx";
import SetNewPassword from "./app/PasswordRecovery/SetNewPassword.tsx";
import ResetLinkPassword from "./app/PasswordRecovery/ResetPasswordLink.tsx";
import { ToastComponent } from "./Shared/Components/ToastComponent.tsx";
import PublicRoute from "./utils/PublicRout.tsx";
import DashboardLayout from "./app/dashboard/MainPage.tsx";
import SinglePost from "./app/SinglePost/singlePost.tsx";
import { UserProfileProvider } from "./context/UserProfileContext.tsx";
import BookmarksPage from "./app/bookmarks/bookmarksPage.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProfileProvider>
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
            <Route element={<DashboardLayout />} path="/">
              <Route path="profile" element={<UserProfile />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="singlePost" element={<SinglePost />} />
            </Route>
          </Route>
          <Route element={<NotFoundPage />} path="*" />
        </Routes>
      </Router>
      {/* <App /> */}
    </UserProfileProvider>
  </React.StrictMode>,
);
