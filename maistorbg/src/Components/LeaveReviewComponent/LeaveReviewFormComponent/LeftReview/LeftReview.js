import { delayFunction } from "../../../../utilFunctions/utilFunctions";
import localStorageManager from "../../../../model/managers/localStorageManager";
import { Card, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import "./LeftReview.scss"
import SpinnerLoader from "../../../SpinnerLoader/SpinnerLoader";

export default function LeftReview({ craftsman, client, offer, jobAdvertisement }) {
    const [review, setReview] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await delayFunction(localStorageManager.getItem, ['allReviews'])
                .then(allReviews => {
                    setReview(allReviews.find(review => review.jobAdvertisementId === offer.jobAdvertisementId));
                })
                .finally(() => setIsLoading(false));
        };

        fetchData();
    }, [offer.jobAdvertisementId]);

    const reviewSummary = review?.reviewSummary;
    const reviewText = review?.review;
    const rating = review?.rating;
    const averageRating = parseFloat(craftsman?.averageRating).toFixed(2);
    const craftsmanName = craftsman?.name;
    const creationDate = review?.creationDate;

    const userReview = () => {
      let stars = "";
      for(let i = 0; i < rating; i++) {
        stars += "✭";
      }
      return stars;
    }

    const starReview = () => {
        const points = Math.round(averageRating);
        let stars = "";
        for(let i = 0 ; i < points; i++) {
            stars += "✭"
        }

        return stars;
    }
    return (
        <div className="card-wrapper">
            <Card className="card">
                {isLoading ? (
                    <SpinnerLoader/>
                ) : (
                    <>
                    <div><strong>Вашето Ревю</strong></div>
                    <div className="row">
                      <div className="col"><span className="bolded-span">Резюме:</span> {reviewSummary}</div>
                    </div>
                    <div className="row">
                      <div className="col"><span className="bolded-span">Ревю:</span> {reviewText}</div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <span className="bolded-span">Вашата оценка:</span> <span className="star-symbol">{userReview()}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <span className="bolded-span">Средна оценка за майсторът:</span>{" "}
                        <span className="star-symbol">{starReview()}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col"><span className="bolded-span">Име на майсторът:</span> {craftsmanName}</div>
                    </div>
                    <div className="row">
                      <div className="col"><span className="bolded-span">Дата и час на ревю:</span> {creationDate}</div>
                    </div>
                  </>
                  
                )}
            </Card>
        </div>

    )
}