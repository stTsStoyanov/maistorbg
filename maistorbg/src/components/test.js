// import localStorageManager from "../model/managers/localStorageManager";
// import { useState, useEffect } from "react";
// import delayFunction from "../utilFunctions/utilFunctions";

// export default function Test() {

//     const [articles, setArticles] = useState([]);
//     useEffect(() => {

//         delayFunction(localStorageManager.getItem, ["articles"])
//             .then(response => {
//                 setArticles(response);
//                 console.log(response);
//                 console.log(typeof response)
//             })


//     }, [])


//     return <>{JSON.stringify(articles)}</>

// }

// import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import userManager from "../model/managers/userManager";
// // import localStorageManager from "../../managers/localStorageManager";

// const LoginForm = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     userManager.login(username, password)
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group controlId="formBasicUsername">
//         <Form.Label>Username</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter username"
//           value={username}
//           onChange={handleUsernameChange}
//         />
//       </Form.Group>

//       <Form.Group controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           type="password"
//           placeholder="Enter password"
//           value={password}
//           onChange={handlePasswordChange}
//         />
//       </Form.Group>

//       <Button variant="primary" type="submit">
//         Login
//       </Button>
//     </Form>
//   );
// };

// export default LoginForm;

// import React, { useState } from "react";
// import userManager from "../model/managers/userManager";

// const RegisterForm = () => {
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     userManager.register(name, username, password, email, phoneNumber)
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </label>
//       <label>
//         Username:
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </label>
//       <label>
//         Password:
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </label>
//       <label>
//         Email:
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </label>
//       <label>
//         Phone Number:
//         <input
//           type="tel"
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//         />
//       </label>
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default RegisterForm;

// import React, { useState } from "react";
// import userManager from "../model/managers/userManager";

// const Test = () => {
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [isActive, setIsActive] = useState(false); // added isActive state

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     userManager.register(name, username, password, email, phoneNumber, isActive);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </label>
//       <label>
//         Username:
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </label>
//       <label>
//         Password:
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </label>
//       <label>
//         Email:
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </label>
//       <label>
//         Phone Number:
//         <input
//           type="tel"
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//         />
//       </label>
//       <label>
//         Is Active:
//         <select value={isActive} onChange={(e) => setIsActive(e.target.value === 'true')}>
//           <option value="true">True</option>
//           <option value="false">False</option>
//         </select>
//       </label>
//       <button type="submit">Register</button>
//     </form>
//   );
// };

import React, { useState } from "react";
import userManager from "../model/managers/userManager";
import jobAdvertisement from "../model/classes/jobAdvertisement";

const Test = () => {
  const [jobAdvertisementTittle, setJobAdvertisementTittle] = useState("");
  const [jobAdvertisementText, setJobAdvertisementText] = useState("");
  const [jobAdvertisementImage, setJobAdvertisementImage] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [category, setCategory] = useState("");

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthorId(localStorage.getItem("loggedUser").id);
    const newJobAdvertisement = new jobAdvertisement(
      jobAdvertisementTittle,
      jobAdvertisementText,
      jobAdvertisementImage,
      authorId,
      category
      );
      let jobAdvertisements = JSON.parse(localStorage.getItem("allJobAdvertisements"));
      jobAdvertisements.push(newJobAdvertisement);
      localStorage.setItem("allJobAdvertisements", JSON.stringify(jobAdvertisements))
    };


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Job Advertisement Tittle:
        <input
          type="text"
          value={jobAdvertisementTittle}
          onChange={(e) => setJobAdvertisementTittle(e.target.value)}
        />
      </label>
      <label>
        Job Advertisement Text:
        <input
          type="text"
          value={jobAdvertisementText}
          onChange={(e) => setJobAdvertisementText(e.target.value)}
        />
      </label>
      <label>
        Job Advertisement Image:
        <input
          type="text"
          value={jobAdvertisementImage}
          onChange={(e) => setJobAdvertisementImage(e.target.value)}
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </label>
      <button type="submit">Create Job Advertisement</button>
    </form>
  );
};


export default Test;
