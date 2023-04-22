// import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import userManager from "../../model/managers/userManager";
// import jobAdvertisement from "../../model/classes/jobAdvertisement";

// const CreateJobAdvertisementForm = () => {
//     const [jobAdvertisementTitle, setJobAdvertisementTitle] = useState("");
//     const [jobAdvertisementText, setJobAdvertisementText] = useState("");
//     const [jobAdvertisementImage, setJobAdvertisementImage] = useState(null);
//     const [category, setCategory] = useState("");

//     let categories = JSON.parse(localStorage.getItem("craftsmenCategories")).map(item => item.category);
//     categories.push("друго");
//     const allCategories = categories;

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!jobAdvertisementTitle || !jobAdvertisementText || !category) {
//             alert("Please fill in all required fields.");
//             return;
//         }
//         if (jobAdvertisementText.length < 25) {
//             alert("Job Advertisement Text must be at least 25 characters long.");
//             return;
//         }
//         userManager.getLoggedUser().then((user) => {
//             const authorId = user.id;
//             const newJobAdvertisement = new jobAdvertisement(
//                 jobAdvertisementTitle,
//                 jobAdvertisementText,
//                 jobAdvertisementImage,
//                 authorId,
//                 category
//             );
//             let jobAdvertisements = JSON.parse(
//                 localStorage.getItem("allJobAdvertisements")
//             );
//             jobAdvertisements.push(newJobAdvertisement);
//             localStorage.setItem(
//                 "allJobAdvertisements",
//                 JSON.stringify(jobAdvertisements)
//             );
//             alert("Офертата Ви беше създадена!")
//             setJobAdvertisementTitle("");
//             setJobAdvertisementText("");
//             setJobAdvertisementImage(null);
//             setCategory("");
//         });
//     };
//     const handleImageUpload = (e) => {
//         const file = e.target.files[0];
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onloadend = () => {
//             setJobAdvertisementImage(reader.result);
//         };
//     };

//     return (
//         <div className="d-flex justify-content-center">
//             <Form
//                 onSubmit={handleSubmit}
//                 style={{ width: "50%" }}>
//                 <Form.Group controlId="formJobTitle">
//                     <Form.Label>Заглавие на офертата<span className="text-danger">*</span></Form.Label>
//                     <Form.Control
//                         type="text"
//                         placeholder="Enter Job Title"
//                         value={jobAdvertisementTitle}
//                         onChange={(e) => setJobAdvertisementTitle(e.target.value)}
//                     />
//                 </Form.Group>
//                 <Form.Group controlId="formJobText">
//                     <Form.Label>Описание на самата работа<span className="text-danger">*</span></Form.Label>
//                     <Form.Control
//                         as="textarea"
//                         rows={3}
//                         placeholder="Enter Job Text"
//                         value={jobAdvertisementText}
//                         onChange={(e) => setJobAdvertisementText(e.target.value)}
//                     />
//                 </Form.Group>
//                 <Form.Group controlId="formJobImage">
//                     <Form.Label>Снимка на офертата</Form.Label>
//                     <Form.Control
//                         id="custom-file"
//                         label="Choose Image"
//                         type="file"
//                         multiple
//                         onChange={handleImageUpload}
//                     />
//                 </Form.Group>
//                 <Form.Group controlId="formCategory">
//                     <Form.Label>Категории<span className="text-danger">*</span></Form.Label>
//                     <Form.Control
//                         as="select"
//                         value={category}
//                         onChange={(e) => setCategory(e.target.value)}
//                     >
//                         <option value="" disabled>
//                             Изберете категория
//                         </option>
//                         {allCategories.map((category, index) => (
//                             <option key={index} value={category}>
//                                 {category}
//                             </option>
//                         ))}
//                     </Form.Control>
//                 </Form.Group>
//                 <Button variant="primary" type="submit" >
//                     Създайте офертата
//                 </Button>
//             </Form>
//         </div>
//     );
// };

// export default CreateJobAdvertisementForm;


import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import userManager from "../../model/managers/userManager";
import jobAdvertisement from "../../model/classes/jobAdvertisement";
import { useNavigate } from "react-router-dom";
import "./createJobAdvertisementForm.scss";

const CreateJobAdvertisementForm = () => {
  const [jobAdvertisementTitle, setJobAdvertisementTitle] = useState("");
  const [jobAdvertisementText, setJobAdvertisementText] = useState("");
  const [jobAdvertisementImages, setJobAdvertisementImages] = useState([]);
  const [category, setCategory] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertText, setAlertText] = useState("");
  const navigate = useNavigate();

  let categories = JSON.parse(localStorage.getItem("craftsmenCategories")).map(
    (item) => item.category
  );
  categories.push("друго");
  const allCategories = categories;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobAdvertisementTitle || !jobAdvertisementText || !category) {
      setShowAlert(true);
      setAlertVariant("danger");
      setAlertText("Моля, попълнете всички задължителни полета.");
      return;
    }
    if (jobAdvertisementText.length < 25) {
      setShowAlert(true);
      setAlertVariant("danger");
      setAlertText("Описанието на офертата трябва да бъде поне 25 символа.");
      return;
    }
    userManager.getLoggedUser().then((user) => {
      const authorId = user.id;
      const newJobAdvertisement = new jobAdvertisement(
        jobAdvertisementTitle,
        jobAdvertisementText,
        jobAdvertisementImages,
        authorId,
        category
      );
      let jobAdvertisements = JSON.parse(
        localStorage.getItem("allJobAdvertisements")
      );
      jobAdvertisements.push(newJobAdvertisement);
      localStorage.setItem(
        "allJobAdvertisements",
        JSON.stringify(jobAdvertisements)
      );
      setShowAlert(true);
      setAlertVariant("success");
      setAlertText("Офертата Ви беше създадена!");
      setJobAdvertisementTitle("");
      setJobAdvertisementText("");
      setJobAdvertisementImages([]);
      setCategory("");
      setTimeout(() => {
        navigate("/home/myprofile/user");
      }, 900);
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // Get an array of files
    const imagePromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    });
    Promise.all(imagePromises).then((base64Images) => {
      setJobAdvertisementImages((prevImages) => prevImages.concat(base64Images));
    });
  };

  return (
    <div className="d-flex justify-content-center, containerJob">
      <Form onSubmit={handleSubmit} style={{ width: "30%" }}>
      <h1 className="text-center">Създайте оферта</h1>
        <Form.Group controlId="formJobTitle">
          <Form.Label>
            Заглавие на офертата<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Job Title"
            value={jobAdvertisementTitle}
            onChange={(e) => setJobAdvertisementTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formJobText">
          <Form.Label>
            Описание на самата работа<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter Job Text"
            value={jobAdvertisementText}
            onChange={(e) => setJobAdvertisementText(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formJobImages">
          <Form.Label>Снимки на офертата</Form.Label>
          <Form.Control
            id="custom-file"
            label="Choose Images"
            type="file"
            multiple
            onChange={handleImageUpload}
                    />
                </Form.Group>
                <Form.Label>Категории<span className="text-danger">*</span></Form.Label>
              <Form.Control
               as="select"
               value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mr-3"
              style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cpath d='M0 2.531l3 3 3-3h-6zm0-2.531h6v2h-6v-2z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right center',
              backgroundSize: '16px 16px',
            }}
            > 
    <option value="" disabled>
        Изберете категория
    </option>
    {allCategories.map((category, index) => (
        <option key={index} value={category}>
            {category}
        </option>
    ))}
              </Form.Control>
                {showAlert && <Alert variant={alertVariant}>{alertText}</Alert>}
                <Button variant="primary" type="submit" >
                    Създайте офертата
                </Button>
            </Form>
        </div>
    );
};

export default CreateJobAdvertisementForm;
