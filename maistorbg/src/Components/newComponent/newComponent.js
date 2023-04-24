// import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import userManager from "../../model/managers/userManager";
// import jobAdvertisement from "../../model/classes/jobAdvertisement";

// const categories = ["IT", "Engineering", "Marketing", "Sales"];

// const NewComponent = () => {
//     const [jobAdvertisementTitle, setJobAdvertisementTitle] = useState("");
//     const [jobAdvertisementText, setJobAdvertisementText] = useState("");
//     const [jobAdvertisementImage, setJobAdvertisementImage] = useState(null);
//     const [category, setCategory] = useState("");

//     const handleSubmit = (e) => {
//         e.preventDefault();
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
//             <Form onSubmit={handleSubmit} style={{ width: "50%" }}>
//                 <Form.Group controlId="formJobTitle">
//                     <Form.Label>Job Advertisement Title</Form.Label>
//                     <Form.Control
//                         type="text"
//                         placeholder="Enter Job Title"
//                         value={jobAdvertisementTitle}
//                         onChange={(e) => setJobAdvertisementTitle(e.target.value)}
//                     />
//                 </Form.Group>
//                 <Form.Group controlId="formJobText">
//                     <Form.Label>Job Advertisement Text</Form.Label>
//                     <Form.Control
//                         as="textarea"
//                         rows={3}
//                         placeholder="Enter Job Text"
//                         value={jobAdvertisementText}
//                         onChange={(e) => setJobAdvertisementText(e.target.value)}
//                     />
//                 </Form.Group>
//                 <Form.Group controlId="formJobImage">
//                     <Form.Label>Job Advertisement Image</Form.Label>
//                     <Form.File
//                         id="custom-file"
//                         label="Choose Image"
//                         custom
//                         onChange={handleImageUpload}
//                     />
//                 </Form.Group>
//                 <Form.Group controlId="formCategory">
//                     <Form.Label>Category</Form.Label>
//                     <Form.Control
//                         as="select"
//                         value={category}
//                         onChange={(e) => setCategory(e.target.value)}
//                     >
//                         <option value="" disabled>
//                             Select a category
//                         </option>
//                         {categories.map((category, index) => (
//                             <option key={index} value={category}>
//                                 {category}
//                             </option>
//                         ))}
//                     </Form.Control>
//                 </Form.Group>
//                 <Button variant="primary" type="submit" disabled={!jobAdvertisementTitle || !jobAdvertisementText || !category}>
//                     Create Job Advertisement
//                 </Button>
//             </Form>
//         </div>
//     );
// };

// export default NewComponent;