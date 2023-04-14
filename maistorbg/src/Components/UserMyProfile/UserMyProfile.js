// import React from "react";
// import { Container, Row, Col, Button } from "react-bootstrap";
// import { Link } from "react-router-dom"; // Import Link from React Router
// import "./NavUser.scss"; // Import SCSS file
// import userManager from "../../model/managers/userManager";

// const ProfilePage = ({ userName, imageUrl }) => {

//   const handlerLogout = () =>{
//     userManager.logout();
// }

//   return (
//     <Container>
//       <Row>
//         <Col>
//           <div className="d-flex justify-content-center mt-4">
//             <img
//               src={
//                 imageUrl ||
//                 "https://via.placeholder.com/300x300.png?text=Default+Image"
//               }
//               alt="Profile"
//               className="img-fluid profile-image"
//             />
//           </div>
//           <div className="d-flex justify-content-center mt-4">
//             <p className="display-4 text-center">
//               Добре дошъл {userName} в твоя профил !
//             </p>
//           </div>
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <div className="d-flex justify-content-center">
//             <Link to="/home/myprofile/user/history" className="btn btn-secondary btn-lg mx-3">
//               <span className="btn-text">Твоята история</span>
//               <span className="btn-icon"></span>
//             </Link>
//             <Link to="/home/myprofile/user/currentoffers" className="btn btn-secondary btn-lg mx-3">
//               <span className="btn-text">Твоите обяви</span>
//               <span className="btn-icon"></span>
//             </Link>
//             <Link to="/route3" className="btn btn-secondary btn-lg mx-3">
//               <span className="btn-text">Твоята информация</span>
//               <span className="btn-icon"></span>
//             </Link>
//           </div>
//           <div className="d-flex justify-content-center mt-4" onClick={handlerLogout}>
//             <Link to="/home" className="btn btn-secondary btn-lg">
//               <span className="btn-text" style={{ whiteSpace: "pre-wrap" }}>
//                 Изход профил
//               </span>
//               <span className="btn-icon"></span>
//             </Link>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default ProfilePage;

import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import "./CraftManProfile.scss";
import userManager from "../../model/managers/userManager";
import "./UserMyProfile.scss"

const handlerLogoutCraftsmen = () => {
  userManager.logout();
};

const UploadImage = ({ setImageUrl }) => {
  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageUrl(reader.result);
      localStorage.setItem("profileImage", reader.result);
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

const CraftManProfile = ({ userName }) => {
  const [imageUrl, setImageUrl] = useState(
    localStorage.getItem("profileImage")
  );

  const handleClick = () => {
    document.getElementById("imageUpload").click();
  };
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const logged = user.username
  ;

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
              <span className="btn-text">Твоята история</span>
              <span className="btn-icon"></span>
            </Link>
            <Link
              to="/home/myprofile/user/currentoffers"
              className="btn btn-secondary btn-lg mx-3"
            >
              <span className="btn-text">Твоите кандидаствания</span>
              <span className="btn-icon"></span>
            </Link>
            <Link
              to="/home/myprofile/user/myinformation"
              className="btn btn-secondary btn-lg mx-3"
            >
              <span className="btn-text">Твоята информация</span>
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

export default CraftManProfile;

