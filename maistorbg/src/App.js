import React from "react";
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

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<Navigate to={"/home"} />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/register" element={<RegistrationForm />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home/offers" element={<Offers />}></Route>
        <Route path="/home/craftsmen" element={<CraftsMen />}></Route>
        <Route path="/home/myprofile/user" element={<MyProfileUser />}>
          {/* <Route path="/history" element={<MyProfileUserPosts />} />
          <Route path="/myoffers" element={<MyProfileUserPhotos />} />
          <Route path="/information" element={<MyProfileUserSettings />} /> */}
        </Route>
        <Route path={"*"} element={<div>NOT FOUND BRAT</div>}></Route>
      </Routes>
    </>
  );
}

export default App;
