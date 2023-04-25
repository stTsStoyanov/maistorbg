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
                        <CurrentJobAdvertisement jobAdvertisement={jobAdvertisement} className="position-sticky"/>
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