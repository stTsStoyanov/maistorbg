import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CraftManProfile.scss";
import userManager from "../../model/managers/userManager";

const handlerLogoutCraftsmen = () => {
  userManager.logout();
};

const UploadImage = ({ setImageUrl }) => {
  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageUrl(reader.result);
      const users = JSON.parse(localStorage.getItem("users"));
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
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("loggedUser", JSON.stringify({
        ...user,
        photo: reader.result,
      }));
    };

    if (image) {
      reader.readAsDataURL(image);
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      style={{ display: "none" }}
      id="imageUpload"
    />
  );
};

const CraftManProfile = () => {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const logged = user.username
  const skilled = user.skills
  const userPic = user.photo
  const [imageUrl, setImageUrl] = useState(
    userPic 
  );

  const handleClick = () => {
    document.getElementById("imageUpload").click();
  };


  return (
    <Container>
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
              Майстор {logged}, добре дошъл в твоя профил !
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex justify-content-center">
            <Link
              to="/home/myprofile/craftsmen/history"
              className="btn btn-secondary btn-lg mx-3"
            >
              <span className="btn-text">Твоята история</span>
              <span className="btn-icon"></span>
            </Link>
            <Link
              to="/home/myprofile/craftsmen/application"
              className="btn btn-secondary btn-lg mx-3"
            >
              <span className="btn-text">Твоите кандидаствания</span>
              <span className="btn-icon"></span>
            </Link>
            <Link
              to="/home/myprofile/craftsmen/myinformation"
              className="btn btn-secondary btn-lg mx-3"
            >
              <span className="btn-text">Твоята информация</span>
              <span className="btn-icon"></span>
            </Link>
            {skilled === null && (
              <Link
                to="/home/myprofile/craftsmen/addskills"
                className="btn btn-secondary btn-lg mx-3"
              >
                <span className="btn-text">Изберета Вашите умения</span>
                <span className="btn-icon"></span>
              </Link>
            )}
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

export default CraftManProfile;
