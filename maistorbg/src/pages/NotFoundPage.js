import React, { useState } from "react";
import Footer from "../components/Footer.js";
import HeaderWithoutUser from "../components/HeaderWithoutLoggedUser.js";
import "./NotFoundPage.css";

export default function HomePage() {
  return (
    <div className="notFoundPageContainer">
      <HeaderWithoutUser />
      <div className="notFoundPageContent">
        <p className="notFoundText">Страницата не е намерена!</p>
      </div>
      <Footer />
    </div>
  );
}
