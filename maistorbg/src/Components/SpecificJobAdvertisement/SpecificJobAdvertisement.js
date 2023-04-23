// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { delayFunction } from "../../utilFunctions/utilFunctions";
// import localStorageManager from "../../model/managers/localStorageManager";
// import CurrentJobAdvertisement from "./CurrentJobAdvertisement/CurrentJobAdvertisement";
// import CurrentJobAdvertisementsOffers from "../CurrentJobAdvertisementsOffers/CurrentJobAdvertisementsOffers";

// export default function SpecificJobAdvertisement() {
//     const { offerId } = useParams();
//     const [jobAdvertisement, setJobAdvertisement] = useState("");

//     useEffect(() => {
//         delayFunction(localStorageManager.getItem, ["allJobAdvertisements"])
//             .then(allJobAdvertisements => {
//                 const currentJobAdvertisement = allJobAdvertisements.find(job => job.jobAdvertisementId === parseInt(offerId));
//                 setJobAdvertisement(currentJobAdvertisement);
//             })
//     }, [])

//     return (
//         <div>
//             <CurrentJobAdvertisement jobAdvertisement={jobAdvertisement}></CurrentJobAdvertisement>
//             <CurrentJobAdvertisementsOffers jobAdvertisement={jobAdvertisement}></CurrentJobAdvertisementsOffers>
//         </div>
//     )

// }


// export default function SpecificJobAdvertisement() {
//     const { offerId } = useParams();
//     const [jobAdvertisement, setJobAdvertisement] = useState("");
//     const [offers, setOffers] = useState(null);

//     useEffect(() => {
//         delayFunction(localStorageManager.getItem, ["allJobAdvertisements"])
//             .then(allJobAdvertisements => {
//                 const currentJobAdvertisement = allJobAdvertisements.find(job => job.jobAdvertisementId === parseInt(offerId));
//                 setJobAdvertisement(currentJobAdvertisement);
//                 delayFunction(localStorageManager.getItem, ["allOffers"]).then((allOffers) => {
//                     const updatedOffers = allOffers.filter(offer => offer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId)
//                     setOffers(updatedOffers);
//                     console.log(jobAdvertisement)
//                     console.log(offers)
//                 })
//             })
//     }, [])

//     return (
//         <div>
//             {offers ? (
//                 <div className="specific-job-advertisement">
//                     <div className="specific-job-advertisement__left">
//                         <CurrentJobAdvertisement jobAdvertisement={jobAdvertisement}></CurrentJobAdvertisement>
//                     </div>
//                     <div className="specific-job-advertisement__right">
//                         <CurrentJobAdvertisementsOffers jobAdvertisement={jobAdvertisement}></CurrentJobAdvertisementsOffers>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="specific-job-advertisement__centered">
//                     <CurrentJobAdvertisement jobAdvertisement={jobAdvertisement}></CurrentJobAdvertisement>
//                 </div>
//             )}
//         </div>
//     )

// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { delayFunction } from "../../utilFunctions/utilFunctions";
import localStorageManager from "../../model/managers/localStorageManager";
import CurrentJobAdvertisement from "./CurrentJobAdvertisement/CurrentJobAdvertisement";
import CurrentJobAdvertisementsOffers from "../CurrentJobAdvertisementsOffers/CurrentJobAdvertisementsOffers";
import './SpecificJobAdvertisement.scss';
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";

export default function SpecificJobAdvertisement() {
    const { offerId } = useParams();
    const [jobAdvertisement, setJobAdvertisement] = useState("");
    const [offers, setOffers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const allJobAdvertisements = await delayFunction(localStorageManager.getItem, ["allJobAdvertisements"]);
                const currentJobAdvertisement = allJobAdvertisements.find(job => job.jobAdvertisementId === parseInt(offerId));
                setJobAdvertisement(currentJobAdvertisement);

                const allOffers = await delayFunction(localStorageManager.getItem, ["allOffers"]);
                const updatedOffers = allOffers.filter(offer => offer.jobAdvertisementId === currentJobAdvertisement.jobAdvertisementId);
                setOffers(updatedOffers);

                console.log(jobAdvertisement);
                console.log(offers);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="SpecificJobAdvertisement">
            {isLoading ? (
                <SpinnerLoader/>
            ) : offers ? (
                <div className="inner-container">
                    <div className="inner-container2">
                        <CurrentJobAdvertisement jobAdvertisement={jobAdvertisement} />
                    </div>
                    <div >
                        <CurrentJobAdvertisementsOffers jobAdvertisement={jobAdvertisement} />
                    </div>
                </div>
            ) : (
                <div >
                    <CurrentJobAdvertisement jobAdvertisement={jobAdvertisement} />
                    <div></div>
                </div>
            )}
        </div>
    );
}


// export default function SpecificJobAdvertisement() {
//     const { offerId } = useParams();
//     const [jobAdvertisement, setJobAdvertisement] = useState("");
//     const [offers, setOffers] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const allJobAdvertisements = await delayFunction(localStorageManager.getItem, ["allJobAdvertisements"]);
//                 const currentJobAdvertisement = allJobAdvertisements.find(job => job.jobAdvertisementId === parseInt(offerId));
//                 setJobAdvertisement(currentJobAdvertisement);

//                 const allOffers = await delayFunction(localStorageManager.getItem, ["allOffers"]);
//                 const updatedOffers = allOffers.filter(offer => offer.jobAdvertisementId === currentJobAdvertisement.jobAdvertisementId);
//                 setOffers(updatedOffers);

//                 console.log(jobAdvertisement);
//                 console.log(offers);
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setIsLoading(false);
//             }
//         }

//         fetchData();
//     }, []);

//     return (
//         <div className={`specific-job-advertisement ${!offers ? 'centered' : ''}`}>
//             {isLoading ? (
//                 <div>Loading...</div>
//             ) : offers ? (
//                 <>
//                     <div className="specific-job-advertisement__left">
//                         <CurrentJobAdvertisement jobAdvertisement={jobAdvertisement} />
//                     </div>
//                     <div className="specific-job-advertisement__right">
//                         <CurrentJobAdvertisementsOffers jobAdvertisement={jobAdvertisement} />
//                     </div>
//                 </>
//             ) : (
//                 <>
//                     <CurrentJobAdvertisement jobAdvertisement={jobAdvertisement} />
//                     <div></div>
//                 </>
//             )}
//         </div>
//     );
// }

// export default function SpecificJobAdvertisement() {
//     const { offerId } = useParams();
//     const [jobAdvertisement, setJobAdvertisement] = useState("");
//     const [offers, setOffers] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const allJobAdvertisements = await delayFunction(localStorageManager.getItem, ["allJobAdvertisements"]);
//                 const currentJobAdvertisement = allJobAdvertisements.find(job => job.jobAdvertisementId === parseInt(offerId));
//                 setJobAdvertisement(currentJobAdvertisement);

//                 const allOffers = await delayFunction(localStorageManager.getItem, ["allOffers"]);
//                 const updatedOffers = allOffers.filter(offer => offer.jobAdvertisementId === currentJobAdvertisement.jobAdvertisementId);
//                 setOffers(updatedOffers);

//                 console.log(jobAdvertisement);
//                 console.log(offers);
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setIsLoading(false);
//             }
//         }

//         fetchData();
//     }, []);

    // return (
    //     <div className="specific-job-advertisement">
    //         {isLoading ? (
    //             <div>Loading...</div>
    //         ) : offers ? (
    //             <>
    //                 <div className="specific-job-advertisement__left">
    //                     <CurrentJobAdvertisement jobAdvertisement={jobAdvertisement} />
    //                 </div>
    //                 <div className="specific-job-advertisement__right">
    //                     <CurrentJobAdvertisementsOffers jobAdvertisement={jobAdvertisement} />
    //                 </div>
    //             </>
    //         ) : (
    //             <div className="specific-job-advertisement__centered">
    //                 <CurrentJobAdvertisement jobAdvertisement={jobAdvertisement} />
    //             </div>
    //         )}
    //     </div>
    // );

//     return (
//         <div>
//           {isLoading ? (
//             <div>Loading...</div>
//           ) : (
//             <div className="specific-job-advertisement">
//               <div className="specific-job-advertisement__centered">
//                 <CurrentJobAdvertisement jobAdvertisement={jobAdvertisement} />
//                 {offers && (
//                   <div className="specific-job-advertisement__right">
//                     <CurrentJobAdvertisementsOffers jobAdvertisement={jobAdvertisement} />
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       );
// }

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { delayFunction } from "../../utilFunctions/utilFunctions";
// import localStorageManager from "../../model/managers/localStorageManager";
// import CurrentJobAdvertisement from "./CurrentJobAdvertisement/CurrentJobAdvertisement";
// import CurrentJobAdvertisementsOffers from "../CurrentJobAdvertisementsOffers/CurrentJobAdvertisementsOffers";
// import './SpecificJobAdvertisement.scss';

// export default function SpecificJobAdvertisement() {
//     const { offerId } = useParams();
//     const [jobAdvertisement, setJobAdvertisement] = useState("");
//     const [offers, setOffers] = useState(null);

//     useEffect(() => {
//         delayFunction(localStorageManager.getItem, ["allJobAdvertisements"])
//             .then(allJobAdvertisements => {
//                 const currentJobAdvertisement = allJobAdvertisements.find(job => job.jobAdvertisementId === parseInt(offerId));
//                 setJobAdvertisement(currentJobAdvertisement);
//                 delayFunction(localStorageManager.getItem, ["allOffers"]).then((allOffers) => {
//                     const updatedOffers = allOffers.filter(offer => offer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId)
//                     setOffers(updatedOffers);
//                 })
//             })
//     }, [])

//     const centeredClass = offers ? '' : 'specific-job-advertisement__centered';
//     const gridClass = offers ? 'specific-job-advertisement' : '';

//     return (
//         <div className={gridClass}>
//             <div className={`specific-job-advertisement__left ${centeredClass}`}>
//                 <CurrentJobAdvertisement jobAdvertisement={jobAdvertisement}></CurrentJobAdvertisement>
//             </div>
//             {offers && (
//                 <div className={`specific-job-advertisement__right ${centeredClass}`}>
//                     <CurrentJobAdvertisementsOffers jobAdvertisement={jobAdvertisement}></CurrentJobAdvertisementsOffers>
//                 </div>
//             )}
//         </div>
//     );
// }
