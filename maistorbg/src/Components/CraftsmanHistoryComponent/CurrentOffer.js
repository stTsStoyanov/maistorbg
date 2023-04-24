
import React, { useEffect, useState } from "react";
import { Card, Carousel } from 'react-bootstrap';
import "./CurrentJobAdvertisement.scss"
import CurrentReview from "./CurrentReview";

export default function CurrentOffer({ jobAdvertisement }) {

    // const [images, setImages] = useState([])

    // useEffect(() => {
    //     if (jobAdvertisement && jobAdvertisement.jobAdvertisementImage) {
    //         setImages(jobAdvertisement.jobAdvertisementImage)

    //     }
    // }, [jobAdvertisement])
    const isNull = jobAdvertisement.isAccepted === null;
    const isFalse = jobAdvertisement.isAccepted === false && jobAdvertisement.isAccepted !== null;
    const isTrue = jobAdvertisement.isAccepted === true;

    // console.log(jobAdvertisement)

    return (
        <div className="card-container job-advertisement-card">
            <>
                <h5 className="text-center">Вашата оферта:</h5>
                <Card>

                    <Card.Body>
                        <div className="grid-container">
                            <div className="grid-item">
                                <strong>Заглавие: </strong> {jobAdvertisement.offerText}<br />
                                {/* {jobAdvertisement.jobAdvertisementTittle} */}
                            </div>
                            <div className="grid-item">

                                <strong>Сума в лева: </strong>{jobAdvertisement.offeredSum}
                                <br />
                            </div>
                            <div className="grid-item">
                                <strong>Изпълнение в дни: </strong>{jobAdvertisement.offeredTerm}<br />

                            </div>
                            <div className="grid-item">
                                <strong>Дата на създаване: </strong>{jobAdvertisement.creationDate}<br />

                            </div>
                            <div className="grid-item">
                                {isNull ?
                                    <strong>Статус: {'в процес на изчакване'}</strong>
                                    : null
                                }
                                {isFalse ?
                                    <strong>Статус: {'офертата е отказана'}</strong>
                                    : null
                                }
                                {isTrue ?
                                    <strong>Статус: {'офертата е приета'}</strong>
                                    : null
                                }


                            </div>

                        </div>
                    </Card.Body>
                </Card>
            </>


            <>
                <CurrentReview jobAdvertisement={jobAdvertisement}/>
            </>
        </div>
    );
}
