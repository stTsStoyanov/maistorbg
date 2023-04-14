import React from "react";
import ProfilePage from "../../components/UserMyProfile/UserMyProfile";
import { Outlet } from "react-router-dom";

export default function MyProfileUser() {
  return (
    <div>
      <ProfilePage />
      <Outlet />
    </div>
  );
}
