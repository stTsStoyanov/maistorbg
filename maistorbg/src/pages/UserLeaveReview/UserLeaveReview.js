import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { delayFunction } from "../../utilFunctions/utilFunctions";
import localStorageManager from "../../model/managers/localStorageManager";
import CurrentJobAdvertisement from "../../components/SpecificJobAdvertisement/CurrentJobAdvertisement/CurrentJobAdvertisement";
import LeaveReviewOfferComponent from "../../components/LeaveReviewComponent/LeaveReviewComponent";
import "./UserLeaveReview.scss";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";

export default function LeaveReviewComponent() {
  const { jobAdvertisementId } = useParams();
  const [jobAdvertisement, setJobAdvertisement] = useState({});
  const [offer, setOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    delayFunction(localStorageManager.getItem, ["allJobAdvertisements"]).then(
      (jobAdvertisements) => {
        const currentJobAdvertisement = jobAdvertisements.find(
          (job) => job.jobAdvertisementId === parseInt(jobAdvertisementId)
        );
        setJobAdvertisement(currentJobAdvertisement);
        delayFunction(localStorageManager.getItem, ["allOffers"]).then(
          (offers) => {
            const acceptedOffer = offers.find(
              (offer) =>
                offer.jobAdvertisementId ===
                currentJobAdvertisement.jobAdvertisementId &&
                offer.isAccepted
            );
            setOffer(acceptedOffer);
          }
        );
      }
    );
  }, [jobAdvertisementId]);

  useEffect(() => {
    if (offer) {
      setIsLoading(false);
    }
  }, [offer]);

  return (
    <div className="container-for-leaving-a-review">
      <div className="background-color">
        <div className="row">
          {isLoading ? (
            <SpinnerLoader/>
          ) : (
          <div className="col-4">
            <CurrentJobAdvertisement jobAdvertisement={jobAdvertisement} />
          </div>
          )}
          <div className="col-8 d-flex justify-content-between gap-2">
            {isLoading ? (
              null
            ) : (
              <LeaveReviewOfferComponent offer={offer} jobAdvertisement={jobAdvertisement} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
