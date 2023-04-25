import React from "react";
import UserMyInformationComponent from "../../components/UserMyInformationComponent/UserMyInformationComponent";

export default function UserMyInformation () {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  return (
    <div>
      <UserMyInformationComponent user={user} />
    </div>
  );
}
