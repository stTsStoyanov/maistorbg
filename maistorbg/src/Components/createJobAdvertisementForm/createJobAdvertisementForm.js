// import React, { useState } from "react";
// import userManager from "../../model/managers/userManager";
// import jobAdvertisement from "../../model/classes/jobAdvertisement";

// const CreateJobAdvertisementForm = () => {
//     const [jobAdvertisementTittle, setJobAdvertisementTittle] = useState("");
//     const [jobAdvertisementText, setJobAdvertisementText] = useState("");
//     const [jobAdvertisementImage, setJobAdvertisementImage] = useState("");
//     const [category, setCategory] = useState("");

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         userManager.getLoggedUser()
//             .then(user => {
//                 const authorId = user.id;
//                 const newJobAdvertisement = new jobAdvertisement(
//                     jobAdvertisementTittle,
//                     jobAdvertisementText,
//                     jobAdvertisementImage,
//                     authorId,
//                     category
//                 );
//                 let jobAdvertisements = JSON.parse(localStorage.getItem("allJobAdvertisements"));
//                 jobAdvertisements.push(newJobAdvertisement);
//                 localStorage.setItem("allJobAdvertisements", JSON.stringify(jobAdvertisements));
//             })
//     };




//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Job Advertisement Tittle:
//                 <input
//                     type="text"
//                     value={jobAdvertisementTittle}
//                     onChange={(e) => setJobAdvertisementTittle(e.target.value)}
//                 />
//             </label>
//             <label>
//                 Job Advertisement Text:
//                 <input
//                     type="text"
//                     value={jobAdvertisementText}
//                     onChange={(e) => setJobAdvertisementText(e.target.value)}
//                 />
//             </label>
//             <label>
//                 Job Advertisement Image:
//                 <input
//                     type="text"
//                     value={jobAdvertisementImage}
//                     onChange={(e) => setJobAdvertisementImage(e.target.value)}
//                 />
//             </label>
//             <label>
//                 Category:
//                 <input
//                     type="text"
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                 />
//             </label>
//             <button type="submit">Create Job Advertisement</button>
//         </form>
//     );
// };


// export default CreateJobAdvertisementForm;


import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import userManager from "../../model/managers/userManager";
import jobAdvertisement from "../../model/classes/jobAdvertisement";

const CreateJobAdvertisementForm = () => {
    const [jobAdvertisementTittle, setJobAdvertisementTittle] = useState("");
    const [jobAdvertisementText, setJobAdvertisementText] = useState("");
    const [jobAdvertisementImage, setJobAdvertisementImage] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        userManager.getLoggedUser()
            .then(user => {
                const authorId = user.id;
                const newJobAdvertisement = new jobAdvertisement(
                    jobAdvertisementTittle,
                    jobAdvertisementText,
                    jobAdvertisementImage,
                    authorId,
                    category
                );
                let jobAdvertisements = JSON.parse(localStorage.getItem("allJobAdvertisements"));
                jobAdvertisements.push(newJobAdvertisement);
                localStorage.setItem("allJobAdvertisements", JSON.stringify(jobAdvertisements));
            })
    };

    return (
        <div className="d-flex justify-content-center">
            <Form onSubmit={handleSubmit} style={{width: "50%"}}>
                <Form.Group controlId="formJobTitle">
                    <Form.Label>Job Advertisement Tittle</Form.Label>
                    <Form.Control type="text" placeholder="Enter Job Title" value={jobAdvertisementTittle} onChange={(e) => setJobAdvertisementTittle(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formJobText">
                    <Form.Label>Job Advertisement Text</Form.Label>
                    <Form.Control type="text" placeholder="Enter Job Text" value={jobAdvertisementText} onChange={(e) => setJobAdvertisementText(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formJobImage">
                    <Form.Label>Job Advertisement Image</Form.Label>
                    <Form.Control type="text" placeholder="Enter Image URL" value={jobAdvertisementImage} onChange={(e) => setJobAdvertisementImage(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" placeholder="Enter Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">Create Job Advertisement</Button>
            </Form>
        </div>
    );
};

export default CreateJobAdvertisementForm;
