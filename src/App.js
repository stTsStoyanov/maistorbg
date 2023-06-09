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
import UserChangePass from "./pages/UserChangePass/UserChangePass";
import CraftmenChangePass from "./pages/CraftmenChangePass/CraftmenChangePass";
import CreateJobAdvertisementForm from "./components/createJobAdvertisementForm/createJobAdvertisementForm";
import MyProfileCrafstmanCategories from "./pages/MyProfileCrafstmanCategories/MyProfileCrafstmanCategories";
import Footer from "./components/Footer/Footer";
import OffersDetails from "./components/OffersDetails/OffersDetails";
import SpecificJobAdvertisement from "./components/SpecificJobAdvertisement/SpecificJobAdvertisement";
import LeaveReviewComponent from "./pages/UserLeaveReview/UserLeaveReview";
import CraftsmenDetails from "./components/Craftsmen/CrafrsmenDetails";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";


function App() {
  const [user, setUser] = useState(false)

  useEffect(() => {
    setInterval(() => {
      const logged = localStorageManager.loggedUser();
      setUser(logged)
    }, 100)

  }, []);

  localStorageManager.initializeAllUsers();
  localStorageManager.initializeArticles();
  localStorageManager.initializeReviews();
  localStorageManager.initializeJobAdvertisements();
  localStorageManager.initializeCraftsmenCategories();
  localStorageManager.initializeOffers()

  const userObject = JSON.parse(localStorage.getItem("loggedUser"));
  const isClient = userObject ? userObject.isClient : false;

  return (
    <>
      {user ? <NavBarLogged /> : <NavBar />}

      <div className="container-maistorBG" >
        <ScrollToTop />
        <Routes>
          <Route index element={<Navigate to={"/home"} />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/register" element={<RegistrationForm />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home/offers" element={<Offers />}></Route>
          <Route path="/home/offers/:id" element={<OffersDetails />}></Route>
          <Route path="/home/craftsmen" element={<CraftsMen />}></Route>
          <Route path="/home/craftsmen/:id" element={<CraftsmenDetails />}></Route>
          <Route path="/home/myprofile/user" element={isClient ? <MyProfileUser /> : <div>PAGE NOT FOUND 404</div>}></Route>
          <Route path="/home/myprofile/user/history" element={<UserHistory />}></Route>
          <Route path="/home/myprofile/user/createoffer" element={<CreateJobAdvertisementForm />}></Route>
          <Route path="/home/myprofile/user/currentoffers" element={<UserMyProfileOffers />}></Route>
          <Route path="/home/myprofile/user/currentoffers/:offerId" element={<SpecificJobAdvertisement />} />
          <Route path="/home/myprofile/user/currentoffers/review/:jobAdvertisementId" element={<LeaveReviewComponent />} />
          <Route path="/home/myprofile/user/myinformation" element={<UserMyInformation />}></Route>
          <Route path="/home/myprofile/user/myinformation/changepass" element={<UserChangePass />}></Route>
          <Route path="/home/myprofile/craftsmen" element={!isClient ? <MyProfileCrtaftmen /> : <div>PAGE NOT FOUND 404</div>}></Route>
          <Route path="/home/myprofile/craftsmen/history" element={<MyProfileCraftmanHistory />}></Route>
          <Route path="/home/myprofile/craftsmen/application" element={<MyProfileCraftmenApplicantion />}></Route>
          <Route path="/home/myprofile/craftsmen/myinformation" element={<MyProfileCraftmenInformation />}></Route>
          <Route path="/home/myprofile/craftsmen/addskills" element={<MyProfileCrafstmanCategories />}></Route>
          <Route path="/home/myprofile/craftsmen/myinformation/changepass" element={<CraftmenChangePass />}></Route>
          <Route path={"/*"} element={<h1 style={{ textAlign: "center", marginTop: "400px", fontSize: "50px" }}>Страницата, която търсите не беше намерена!</h1>}></Route>
        </Routes>
      </div>
      <div className="footer-maistorBG">
        <Footer />
      </div>
    </>
  );
}

export default App;
