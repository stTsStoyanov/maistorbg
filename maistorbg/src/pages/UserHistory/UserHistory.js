// // import React, { useState } from "react";
// // import JobAdvertisements from "../../components/UserHistoryComponent/UserHistoryComponent"
// // import localStorageManager from "../../model/managers/localStorageManager"
// // import { delayFunction } from "../../utilFunctions/utilFunctions"

// // export default function UserHistory() {
// //   const [loggedUser, setLoggedUser] = useState(null);
// //   const [jobAdvertisements, setJobAdvertisements] = useState([]);
// //   const [offers, setOffers] = useState([]);

// //   // delayFunction(localStorageManager.getItem, ["loggedUser"])
// //   //   .then(user => {
// //   //     setLoggedUser(user);
// //   //     localStorageManager.getItem("allJobAdvertisements")
// //   //       .then(allJobAdvertisements => {
// //   //         const neededJobs = allJobAdvertisements.filter(job => job.authorId === loggedUser.id);
// //   //         setJobAdvertisements(neededJobs);
// //   //         const allOffers = localStorageManager.getItem("allOffers");
// //   //         setOffers(allOffers);
// //   //       })
// //   //   })

// //   setLoggedUser(JSON.parse(localStorage.getItem("loggedUser")));
// //   const allJobAdvertisements = JSON.parse(localStorage.getItem("allJobAdvertisements"));
// //   setJobAdvertisements(allJobAdvertisements.filter(job => job.authorId === loggedUser.id));
// //   setOffers(JSON.parse(localStorage.getItem("allOffers")))

  

// //   return (
// //     <div>
// //       <jobAdvertisements jobAdvertisements ={jobAdvertisements} offers ={offers}/>
// //     </div>
// //   );
// // }

// import React, { useState, useEffect } from "react";
// import JobAdvertisements from "../../components/UserHistoryComponent/UserHistoryComponent"
// import localStorageManager from "../../model/managers/localStorageManager"
// import { delayFunction } from "../../utilFunctions/utilFunctions"

// export default function UserHistory() {
//   const [loggedUser, setLoggedUser] = useState(null);
//   const [jobAdvertisements, setJobAdvertisements] = useState([]);
//   const [offers, setOffers] = useState([]);

//   useEffect(() => {
//     const fetchUserAndData = async () => {
//       const user = await delayFunction(localStorageManager.getItem, ["loggedUser"]);
//       setLoggedUser(user);
//       const allJobAdvertisements = await localStorageManager.getItem("allJobAdvertisements");
//       setJobAdvertisements(allJobAdvertisements.filter(job => job.authorId === user.id));
//       const allOffers = await localStorageManager.getItem("allOffers");
//       setOffers(allOffers);
//     };
//     fetchUserAndData();
//   }, []);

//   return (
//     <div>
//       <JobAdvertisements jobAdvertisements={jobAdvertisements} offers={offers}/>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import JobAdvertisements from "../../components/UserHistoryComponent/UserHistoryComponent";
// import localStorageManager from "../../model/managers/localStorageManager";
// import { delayFunction } from "../../utilFunctions/utilFunctions";
// import { Spinner } from "react-bootstrap";

// export default function UserHistory() {
//   const [loggedUser, setLoggedUser] = useState(null);
//   const [jobAdvertisements, setJobAdvertisements] = useState([]);
//   const [offers, setOffers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserAndData = async () => {
//       const user = await delayFunction(localStorageManager.getItem, ["loggedUser"]);
//       setLoggedUser(user);
//       const allJobAdvertisements = await localStorageManager.getItem("allJobAdvertisements");
//       setJobAdvertisements(allJobAdvertisements.filter(job => job.authorId === user.id));
//       const allOffers = await localStorageManager.getItem("allOffers");
//       setOffers(allOffers);
//       setIsLoading(false);
//     };
//     fetchUserAndData();
//   }, []);

//   return (
//     <div>
//       {isLoading ? (
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       ) : (
//         <JobAdvertisements jobAdvertisements={jobAdvertisements} offers={offers} />
//       )}
//     </div>
//   );
// }


import React from "react";
import UserHistoryComponent from "../../components/UserHistoryComponent/UserHistoryComponent"

export default function UserHistory() {
  return (
    <div>
      <UserHistoryComponent />
    </div>
  );
}