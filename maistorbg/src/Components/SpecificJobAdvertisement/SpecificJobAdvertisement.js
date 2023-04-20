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

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { delayFunction } from "../../utilFunctions/utilFunctions";
import localStorageManager from "../../model/managers/localStorageManager";
import CurrentJobAdvertisement from "./CurrentJobAdvertisement/CurrentJobAdvertisement";
import CurrentJobAdvertisementsOffers from "../CurrentJobAdvertisementsOffers/CurrentJobAdvertisementsOffers";
import './SpecificJobAdvertisement.scss';

export default function SpecificJobAdvertisement() {
    const { offerId } = useParams();
    const [jobAdvertisement, setJobAdvertisement] = useState("");

    useEffect(() => {
        delayFunction(localStorageManager.getItem, ["allJobAdvertisements"])
            .then(allJobAdvertisements => {
                const currentJobAdvertisement = allJobAdvertisements.find(job => job.jobAdvertisementId === parseInt(offerId));
                setJobAdvertisement(currentJobAdvertisement);
            })
    }, [])

    return (
        <div className="specific-job-advertisement">
            <div className="specific-job-advertisement__left">
                <CurrentJobAdvertisement jobAdvertisement={jobAdvertisement}></CurrentJobAdvertisement>
            </div>
            <div className="specific-job-advertisement__right">
                <CurrentJobAdvertisementsOffers jobAdvertisement={jobAdvertisement}></CurrentJobAdvertisementsOffers>
            </div>
        </div>
    )

}
