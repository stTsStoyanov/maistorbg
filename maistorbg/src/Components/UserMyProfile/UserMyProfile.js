import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import userManager from "../../model/managers/userManager";
import localStorageManager from "../../model/managers/localStorageManager";
import "./UserMyProfile.scss";

const handlerLogoutCraftsmen = () => {
  userManager.logout();
};

const UploadImage = ({ setImageUrl }) => {
  const [error, setError] = useState("");

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();

    const types = ["image/jpeg", "image/png", "image/gif"];
    if (!types.includes(image.type)) {
      setError("Невалиден формат на изображението.");
      return;
    }

    const sizeLimit = 1024 * 1024; // 1MB
    if (image.size > sizeLimit) {
      setError("Изображението е твърде голямо.");
      return;
    }

    reader.onload = () => {
      setImageUrl(reader.result);
      localStorageManager
        .getItem("users")
        .then((users) => {
          const user = JSON.parse(localStorage.getItem("loggedUser"));
          const updatedUsers = users.map((u) => {
            if (u.id === user.id) {
              return {
                ...u,
                photo: reader.result,
              };
            } else {
              return u;
            }
          });
          localStorageManager.setItem("users", updatedUsers);
          localStorageManager.setItem("loggedUser", {
            ...user,
            photo: reader.result,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    if (image) {
      reader.readAsDataURL(image);
      setError("");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        id="imageUpload"
      />
      <div>{error && <p>{error}</p>}</div>
    </div>
  );
};

const UserMyProfile = () => {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const logged = user.username;
  const photoPic = user.photo;
  const [imageUrl, setImageUrl] = useState(photoPic);

  const handleClick = () => {
    document.getElementById("imageUpload").click();
  };

  return (
    <Container className="userMyProfile">
      <Row>
        <Col>
          <div className="d-flex justify-content-center mt-4">
            <img
              src={
                imageUrl ||
                "https://via.placeholder.com/300x300.png?text=Default+Image"
              }
              alt="Profile"
              className="img-fluid profile-image"
              onClick={handleClick}
            />
            <UploadImage setImageUrl={setImageUrl} />
          </div>
          <div className="d-flex justify-content-center mt-4">
            <p className="display-4 text-center">
              Добре дошъл {logged} в твоя профил !
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex justify-content-center">
            <Link
              to="/home/myprofile/user/history"
              className="btn btn-secondary btn-lg mx-3"
            >
              <span className="btn-text">Моята история</span>
              <span className="btn-icon"></span>
            </Link>
            <Link
              to="/home/myprofile/user/currentoffers"
              className="btn btn-secondary btn-lg mx-3"
            >
              <span className="btn-text">Моите обяви</span>
              <span className="btn-icon"></span>
            </Link>
            <Link
              to="/home/myprofile/user/myinformation"
              className="btn btn-secondary btn-lg mx-3"
            >
              <span className="btn-text">Моята информация</span>
              <span className="btn-icon"></span>
            </Link>
            <Link
              to="/home/myprofile/user/createoffer"
              className="btn btn-secondary btn-lg mx-3"
            >
              <span className="btn-text">Създаване на обява</span>
              <span className="btn-icon"></span>
            </Link>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <Link
              to="/home"
              className="btn btn-secondary btn-lg"
              onClick={handlerLogoutCraftsmen}
            >
              <span className="btn-text" style={{ whiteSpace: "pre-wrap" }}>
                Изход профил
              </span>
              <span className="btn-icon"></span>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserMyProfile;
