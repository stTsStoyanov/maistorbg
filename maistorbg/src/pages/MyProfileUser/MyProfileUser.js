import React from "react";
import UserMyProfile from "../../components/UserMyProfile/UserMyProfile";
import { Outlet } from "react-router-dom";

export default function MyProfileUser() {
  return (
    <div>
      <UserMyProfile />
      <Outlet />
    </div>
  );
}
