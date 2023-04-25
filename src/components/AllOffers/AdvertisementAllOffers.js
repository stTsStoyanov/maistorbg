import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';


const AdvertisementAllOffers = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex(index => index === 2 ? 0 : index + 1);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='advertisement'>
      <Carousel activeIndex={index} onSelect={handleSelect} interval={null}  style={{ maxWidth: "700px", margin: "auto" }}>
        <Carousel.Item>
          <img
            className="carousel-image"
            src="https://www.promooferti.com/wp-content/uploads/2021/12/bricolage-700x366.jpg"
            alt="First slide"
            style={{ height: "400px", width: "700px", marginBottom: "40px" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel-image"
            src="https://www.unicreditbulbank.bg/media/filer_public/24/da/24dae29c-7ef5-45d5-9911-e91be67e6f58/ucf-news-ikea-feb2022-2.jpg"
            alt="Second slide"
            style={{ height: "400px", width: "700px", marginBottom: "40px" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel-image"
            src="https://i.pinimg.com/750x/49/7b/df/497bdf487743c3ceea66134aca725d8d.jpg"
            alt="Third slide"
            style={{ height: "400px", width: "700px", marginBottom: "40px" }}
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default AdvertisementAllOffers;

