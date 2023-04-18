import React, { useState, useEffect } from "react";
import JobAdvertisements from "./JobAdvertisements/JobAdvertisements";
import localStorageManager from "../../model/managers/localStorageManager";
import { delayFunction } from "../../utilFunctions/utilFunctions";
import { Spinner } from "react-bootstrap";

export default function UserHistoryComponent() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [jobAdvertisements, setJobAdvertisements] = useState([]);
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndData = async () => {
      const user = await delayFunction(localStorageManager.getItem, ["loggedUser"]);
      setLoggedUser(user);
      const allJobAdvertisements = await localStorageManager.getItem("allJobAdvertisements");
      setJobAdvertisements(allJobAdvertisements.filter(job => job.authorId === user.id));
      const allOffers = await localStorageManager.getItem("allOffers");
      setOffers(allOffers);
      setIsLoading(false);
    };
    fetchUserAndData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <JobAdvertisements jobAdvertisements={jobAdvertisements} offers={offers} />
      )}
    </div>
  );
}
