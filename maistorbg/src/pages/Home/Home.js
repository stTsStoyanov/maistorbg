// import React, { useState, useEffect } from 'react';
// import './Home.scss';
// import TopCraftsmen from '../../components/HomePage/TopCraftsmen';
// import Review from '../../components/HomePage/Review';
// import Articles from '../../components/HomePage/Articles';
// import Advertisement from '../../components/HomePage/Advertisement';
// import localStorageManager from '../../model/managers/localStorageManager';
// import { delayFunction } from '../../utilFunctions/utilFunctions';
// import { Button, Toast } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import houseBanner from "../../images/house-banner.png"
// import secondBanner from "../../images/banner2.jpg"
// import thirdBanner from "../../images/banner3.jpg"
// import AllOffers from '../../components/AllOffers/AllOffers';


// export default function Home() {
//   const [loggedUser, setLoggedUser] = useState(null);
//   const [jobAdvertisements, setJobAdvertisements] = useState(null);
//   const [allOffers, setAllOffers] = useState(null);
//   const [showToast, setShowToast] = useState(false);

//   const fetchData = async () => {
//     const user = await delayFunction(localStorageManager.getItem, ['loggedUser']);
//     setLoggedUser(user);
//     if (user && user.isClient === true) {
//       const jobAds = await delayFunction(localStorageManager.getItem, ['allJobAdvertisements']);
//       const updatedJobAds = jobAds.filter(job => job.authorId === loggedUser.id);
//       setJobAdvertisements(updatedJobAds);
//       const offers = await delayFunction(localStorageManager.getItem, ['allOffers']);
//       // const updatedOffers = offers.filter(offer => offer.job)
//       setAllOffers(offers);
//     }
//   };

//   useEffect(() => {
//     const fetchDataAsync = async () => {
//       await fetchData();
//     };
//     fetchDataAsync();
//   }, []);

//   // useEffect(() => {

//   //   jobAdvertisements.forEach(job => {
//   //     allOffers.forEach(offer => {
//   //       if (offer.jobAdvertisemntId === job.jobAdvertisemntId) {
//   //         setShowToast(true);
//   //         return
//   //       } else {
//   //         setShowToast(false);
//   //       }
//   //     })
//   //   })




//   //   // const unseenOffer = allOffers && allOffers.find((offer) => !offer.hasBeenSeen);
//   //   // if (unseenOffer) {
//   //   //   setShowToast(true);
//   //   //   unseenOffer.hasBeenSeen = true;
//   //   // } else {
//   //   //   setShowToast(false);
//   //   // }
//   // }, [allOffers, jobAdvertisements]);

//   useEffect(() => {
//     if (jobAdvertisements && allOffers) {
//       for (let i = 0; i < jobAdvertisements.length; i++) {
//         for (let j = 0; j < allOffers.length; j++) {
//           if (allOffers[j].jobAdvertisemntId === jobAdvertisements[i].jobAdvertisemntId) {
//             setShowToast(true);
//             return;
//           }
//         }
//       }
//       setShowToast(false);
//     }
//   }, [jobAdvertisements, allOffers]);
  


//   const handleToastClose = () => {
//     setShowToast(false);
//   };

//   return (
//     <div className='home'>
//       <TopCraftsmen />
//       <div>
//         <img src={thirdBanner}
//           style={{ width: '100%', maxHeight: '100%' }}
//         />
//       </div>
//       <Review />
//       <Advertisement />
//       <Articles />
//       {showToast && (
//         <Toast
//           onClose={() => setShowToast(false)}
//           delay={5000}
//           autohide
//           className='toast-container font-color-toast'
//           closeButton={true}
//           bg='white'>
//           <Toast.Body className="font-color-toast font-size-toast">Имате невидянa оферта!</Toast.Body>
//         </Toast>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import './Home.scss';
import TopCraftsmen from '../../components/HomePage/TopCraftsmen';
import Review from '../../components/HomePage/Review';
import Articles from '../../components/HomePage/Articles';
import Advertisement from '../../components/HomePage/Advertisement';
import localStorageManager from '../../model/managers/localStorageManager';
import { delayFunction } from '../../utilFunctions/utilFunctions';
import { Button, Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import houseBanner from "../../images/house-banner.png"
import secondBanner from "../../images/banner2.jpg"
import thirdBanner from "../../images/banner3.jpg"
import AllOffers from '../../components/AllOffers/AllOffers';


export default function Home() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [jobAdvertisements, setJobAdvertisements] = useState(null);
  const [allOffers, setAllOffers] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const fetchData = async () => {
    const user = await delayFunction(localStorageManager.getItem, ['loggedUser']);
    setLoggedUser(user);
    if (user && user.isClient === true) {
      const jobAds = await delayFunction(localStorageManager.getItem, ['allJobAdvertisements']);
      const updatedJobAds = jobAds.filter(job => job.authorId === user.id); // <-- use "user" instead of "loggedUser"
      setJobAdvertisements(updatedJobAds);
      const offers = await delayFunction(localStorageManager.getItem, ['allOffers']);
      // const updatedOffers = offers.filter(offer => offer.job)
      setAllOffers(offers);
    }
  };
  

  useEffect(() => {
    const fetchDataAsync = async () => {
      await fetchData();
    };
    fetchDataAsync();
  }, []);

  useEffect(() => {
    if (jobAdvertisements && allOffers) {
      let hasUnseenOffer = false;
      jobAdvertisements.forEach((job) => {
        allOffers.forEach((offer) => {
          if (offer.jobAdvertisemntId === job.jobAdvertisemntId && !offer.hasBeenSeen) {
            hasUnseenOffer = true;
          }
        });
      });
      setShowToast(hasUnseenOffer);
    }
  }, [jobAdvertisements, allOffers]);

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <div className='home'>
      <TopCraftsmen />
      <div>
        <img src={thirdBanner}
          style={{ width: '100%', maxHeight: '100%' }}
        />
      </div>
      <Review />
      <Advertisement />
      <Articles />
      {showToast && (
        <Toast
          onClose={() => setShowToast(false)}
          delay={5000}
          autohide
          className='toast-container font-color-toast'
          closeButton={true}
          bg='white'>
          <Toast.Body className="font-color-toast font-size-toast">Имате невидянa оферта!</Toast.Body>
        </Toast>
      )}
    </div>
  );
}
