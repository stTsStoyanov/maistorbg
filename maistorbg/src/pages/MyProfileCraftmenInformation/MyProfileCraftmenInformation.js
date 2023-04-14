import MyProfileCraftmenInformationComponent from "../../components/MyProfileCraftmenInformationComponent/MyProfileCraftmenInformationComponent";
import React from "react";

export default function MyProfileCraftmenInformation () {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  return (
    <div>
      <MyProfileCraftmenInformationComponent user={user}/>
    </div>
  );
}