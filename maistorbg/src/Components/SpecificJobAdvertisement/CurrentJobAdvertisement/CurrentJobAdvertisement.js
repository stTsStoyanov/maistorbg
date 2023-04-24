import React, { useEffect, useState } from "react";
import { Card, Carousel } from 'react-bootstrap';
import "./CurrentJobAdvertisement.scss"

export default function CurrentJobAdvertisement({ jobAdvertisement }) {

    const [images, setImages] = useState([])

    useEffect(() => {
        if (jobAdvertisement && jobAdvertisement.jobAdvertisementImage) {
            setImages(jobAdvertisement.jobAdvertisementImage)
            
        }
    }, [jobAdvertisement])

return (
    <div className="card-container job-advertisement-card">
      <Card>
        {images && images.length === 1 ? (
          <Card.Img variant="top" src={images[0]} className="current-job-ad-single-image" />
        ) : (
          <Carousel className="text-center">
            {images && images.map((photo, index) => (
              <Carousel.Item key={index}>
                <img className="carousel-image" src={photo} alt={`Job Photo ${index + 1}`} />
              </Carousel.Item>
            ))}
          </Carousel>
        )}
        <Card.Body>
          <div className="grid-container">
            <div className="grid-item">
              <strong>Заглавие: </strong> {jobAdvertisement.jobAdvertisementTittle}<br/>
              {/* {jobAdvertisement.jobAdvertisementTittle} */}
            </div>
            <div className="grid-item">
              <strong>Обява: </strong>{jobAdvertisement.jobAdvertisementText}
              <br/>
            </div>
            <div className="grid-item">
              <strong>Категория: </strong>{jobAdvertisement.category}<br/>
            </div>
            <div className="grid-item">
              <strong>Дата на създаване: </strong>{jobAdvertisement.creationDate}<br/>
            </div>
            <div className="grid-item">
              <strong>Статус: </strong> {jobAdvertisement.isOfferTaken ? "Обявата е извършена" : "търси се майстор"}<br/>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
