import React, { useState } from "react";
import HeaderWithUser from "../components/HeaderLoggedUser";
import Footer from "../components/Footer.js";
import HeaderWithoutUser from "../components/HeaderWithoutLoggedUser.js";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="homePageContainer">
      <HeaderWithUser />
      <div className="homePageContent"> Text </div>
      {/* <HeaderWithoutUser /> */}
      <Footer />
    </div>
  );
}
