
import React, { useEffect, useState } from "react";
import { Card, Carousel } from 'react-bootstrap';
import "./CurrentJobAdvertisement.scss"

export default function CurrentReview({ jobAdvertisement }) {

    const [review, setReview] = useState([]);
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    useEffect(() => {
        const allReview = JSON.parse(localStorage.getItem('allReviews'));
        const theReview = allReview.find(el => el.jobAdvertisementId === jobAdvertisement.jobAdvertisementId && el.craftsmanId === loggedUser.id);
        console.log(theReview)
        setReview(theReview);
    }, [])


    // console.log(jobAdvertisement)

    return (

        <div className="card-container job-advertisement-card">
            {review ?
                <Card>

                    <Card.Body>
                        <div className="grid-container">
                            <div className="grid-item">
                                <strong>Клиент: </strong> {review.clientName}<br />
                                {/* {jobAdvertisement.jobAdvertisementTittle} */}
                            </div>
                            <div className="grid-item">

                                <strong>Рейтинг: </strong>{review.rating}
                                <br />
                            </div>
                            <div className="grid-item">
                                <strong>Ревю от клиента: </strong>{review.review}<br />
                            </div>

                        </div>
                    </Card.Body>
                </Card>
            : null}
        </div>

    );
}
