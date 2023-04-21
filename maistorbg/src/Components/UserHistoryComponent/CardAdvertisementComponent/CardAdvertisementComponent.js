import React, { useEffect, useState } from "react";
import { Card, Carousel } from 'react-bootstrap';
import "./CardAdvertisementComponent.scss";


export default function CardAdvertisementComponent({ jobAdvertisement }) {

    const [images, setImages] = useState([])

    useEffect(() => {
        if (jobAdvertisement && jobAdvertisement.jobAdvertisementImage) {
            setImages(jobAdvertisement.jobAdvertisementImage)
            
        }
    }, [jobAdvertisement])

   return (
        <div >
            <Card className="card-container-history job-advertisement-card">
                <Carousel className="text-center">
                    {images && images.map((photo, index) => (
                        <Carousel.Item key={index}>
                            <img className="carousel-image-history" src={photo} alt={`Job Photo ${index + 1}`} />
                        </Carousel.Item>
                    ))}
                </Carousel>
                <Card.Body>
                    <div className="grid-container-history">
                        <div className="grid-item-history">
                            Заглавие: {jobAdvertisement.jobAdvertisementTittle}<br/>
                            {/* {jobAdvertisement.jobAdvertisementTittle} */}
                        </div>
                        <div className="grid-item-history">
                            
                            Обява: {jobAdvertisement.jobAdvertisementText}
                            <br/>
                        </div>
                        <div className="grid-item-history">
                            Категория: {jobAdvertisement.category}<br/>
                            
                        </div>
                        <div className="grid-item-history">
                            Дата на създаване: {jobAdvertisement.creationDate}<br/>
                            
                        </div>
                        <div className="grid-item-history">
                            Статус: {jobAdvertisement.isOfferTaken ? "Обявата е извършена" : "търси се майстор"}<br/>
                            
                        </div>
                        
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}
