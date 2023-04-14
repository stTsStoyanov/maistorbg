import React from "react";
import UserMyInformationComponent from "../../components/UserMyInformationComponent/UserMyInformationComponent";
import localStorageManager from "../../model/managers/localStorageManager";

export default function UserMyInformation () {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  return (
    <div>
      <UserMyInformationComponent user={user} />
    </div>
  );
}
