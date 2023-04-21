import { delayFunction } from "../../../../utilFunctions/utilFunctions";
import localStorageManager from "../../../../model/managers/localStorageManager";
import { Card, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import "./LeftReview.scss"

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

    //     return (
    //             <Card>
    //                 {isLoading ? (
    //                     <Spinner animation="border" />
    //                 ) : (
    //                     <>
    //                         <div className="row">
    //                             <div className="col">{reviewSummary}</div>
    //                         </div>
    //                         <div className="row">
    //                             <div className="col">{reviewText}</div>
    //                         </div>
    //                         <div className="row">
    //                             <div className="col">
    //                                 Your rating: {rating} / 5.0
    //                             </div>
    //                         </div>
    //                         <div className="row">
    //                             <div className="col">
    //                                 Average rating: {averageRating}
    //                             </div>
    //                         </div>
    //                         <div className="row">
    //                             <div className="col">
    //                                 {craftsmanName}
    //                             </div>
    //                         </div>
    //                         <div className="row">
    //                             <div className="col">
    //                                 {creationDate}
    //                             </div>
    //                         </div>
    //                     </>
    //                 )}
    //             </Card>
    //     );
    // }
    return (
        <div className="card-wrapper">
            <Card className="card">
                {isLoading ? (
                    <div className="spinner-wrapper">
                        <Spinner className="spinner" animation="border" />
                    </div>
                ) : (
                    <>
                        <div className="row">
                            <div className="col">Резюме: {reviewSummary}</div>
                        </div>
                        <div className="row">
                            <div className="col">Ревю: {reviewText}</div>
                        </div>
                        <div className="row">
                            <div className="col">
                                Вашата оценка: {rating} / 5
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                Средна оценка за майсторът: {averageRating}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                Име на майсторът: {craftsmanName}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                Дата и час на ревю: {creationDate}
                            </div>
                        </div>
                    </>
                )}
            </Card>
        </div>

    )
}


// export default function LeftReview({craftsman, client, offer, jobAdvertisement}) {

//     const [review, setReview] = useState(null);

//     const fetchData = async () => {
//         await delayFunction(localStorageManager.getItem, ["allReviews"])
//         .then(allReviews => {
//             setReview(allReviews.find(review => review.jobAdvertisementId === offer.jobAdvertisementId))
//         })
//     }

//     return <div>alabaa</div>
// }