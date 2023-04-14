import React, { useEffect, useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import NavBar from "./components/Navigation/NavBar";
import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import RegistrationForm from "./pages/Register/Register";
import Offers from "./pages/Offers/Offers";
import CraftsMen from "./pages/CraftsMen/CraftsMen";
import MyProfileUser from "./pages/MyProfileUser/MyProfileUser";
import localStorageManager from "./model/managers/localStorageManager"
import NavBarLogged from "./components/LoggedUserNavigation/LoggedUserNavigation"
import UserHistory from "./pages/UserHistory/UserHistory";
import UserMyInformation from "./pages/UserMyInformation/UserMyInformation"; 
import MyProfileCraftmenInformation from "./pages/MyProfileCraftmenInformation/MyProfileCraftmenInformation";
import MyProfileCrtaftmen from "./pages/MyProfileCrtaftmen/MyProfileCrtaftmen";
import MyProfileCraftmanHistory from "./pages/MyProfileCraftmеnHistory/MyProfileCraftmеnHistory";
import UserMyProfileOffers from "./pages/UserMyProfileOffers/UserMyProfileOffers";
import MyProfileCraftmenApplicantion from "./pages/MyProfileCraftmenApplicantion/MyProfileCraftmenApplicantion";

import TopCraftsmen from "./components/HomePage/TopCraftsmen";


function App() {
  const [user, setUser] = useState(false)

  useEffect( () => {
    setInterval(() => {
      const logged = localStorageManager.loggedUser();
      setUser(logged)
    }, 100)
  
  },[]);

  localStorageManager.initializeAllUsers();
  localStorageManager.initializeArticles();
  localStorageManager.initializeReviews();
  localStorageManager.initializeJobAdvertisements();

  const userObject = JSON.parse(localStorage.getItem("loggedUser"));
  const isClient = userObject ? userObject.isClient : false;

  return (
    <>

      {user ? <NavBarLogged/> : <NavBar/>}
   
      <Routes>
        <Route index element={<Navigate to={"/home"} />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/register" element={<RegistrationForm />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home/offers" element={<Offers />}></Route>
        <Route path="/home/craftsmen" element={<CraftsMen />}></Route>
        <Route path="/home/myprofile/user" element={isClient ?  <MyProfileUser /> : <div>PAGE NOT FOUND 404</div>}></Route>
        <Route path="/home/myprofile/user/history" element={<UserHistory />}></Route>
        <Route path="/home/myprofile/user/currentoffers" element={<UserMyProfileOffers />}></Route>
        <Route path="/home/myprofile/user/myinformation" element={<UserMyInformation />}></Route>
        <Route path="/home/myprofile/craftsmen" element={!isClient ? <MyProfileCrtaftmen /> : <div>PAGE NOT FOUND 404</div>}></Route>
        <Route path="/home/myprofile/craftsmen/history" element={<MyProfileCraftmanHistory />}></Route>
        <Route path="/home/myprofile/craftsmen/application" element={<MyProfileCraftmenApplicantion />}></Route>
        <Route path="/home/myprofile/craftsmen/myinformation" element={<MyProfileCraftmenInformation />}></Route>
        <Route path={"*"} element={<div>PAGE NOT FOUND 404</div>}></Route>
      </Routes>
    </>
  );
}

export default App;
