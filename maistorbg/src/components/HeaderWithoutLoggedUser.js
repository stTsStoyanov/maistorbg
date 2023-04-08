import React from "react";
import "./Header.css";

function HeaderWithoutUser() {
  return (
    <header className="header">
      <div>
        <a className="navigation">Регистрирай се</a>
      </div>
      <div>
        <a className="navigation">Влез</a>
      </div>
      <div>
        <a className="navigation">Обяви за ремонти</a>
      </div>
      <div>
        <a className="navigation">Майстори</a>
      </div>
    </header>
  );
}

export default HeaderWithoutUser;
