import React, { useEffect, useState } from "react";
import { Card, Carousel } from 'react-bootstrap';
import "./CurrentJobAdvertisement.css"

export default function CurrentJobAdvertisement({ jobAdvertisement }) {

    const [images, setImages] = useState([])

    useEffect(() => {
        if (jobAdvertisement && jobAdvertisement.jobAdvertisementImage) {
            setImages(jobAdvertisement.jobAdvertisementImage)
            
        }
    }, [jobAdvertisement])

   return (
        <div className="card-container">
            <Card>
                <Carousel className="text-center">
                    {images && images.map((photo, index) => (
                        <Carousel.Item key={index}>
                            <img className="carousel-image" src={photo} alt={`Job Photo ${index + 1}`} />
                        </Carousel.Item>
                    ))}
                </Carousel>
                <Card.Body>
                    <Card.Title>{jobAdvertisement.jobAdvertisementTittle}</Card.Title>
                    <Card.Text>
                        <strong>Job Description:</strong><br/>
                        {jobAdvertisement.jobAdvertisementText}
                    </Card.Text>
                    <Card.Text>
                        <strong>Category:</strong><br/>
                        {jobAdvertisement.category}
                    </Card.Text>
                    <Card.Text>
                        <strong>Creation Date:</strong><br/>
                        {jobAdvertisement.creationDate}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}
