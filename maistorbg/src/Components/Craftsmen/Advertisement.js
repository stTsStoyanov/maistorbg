import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import './Advertisement.scss';

const Advertisement = () => {
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
            src="https://www.alo.bg/user_files/m/maistorfix/6919282_114297467_big.jpg"
            alt="First slide"
            style={{ height: "400px", width: "700px" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel-image"
            src="https://i.ytimg.com/vi/CTi8TsMIopY/maxresdefault.jpg"
            alt="Second slide"
            style={{ height: "400px", width: "700px" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel-image"
            src="https://stroiteli.elmedia.net/pic/rek/stroiteli-adv-09523.jpg"
            alt="Third slide"
            style={{ height: "400px", width: "700px" }}
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Advertisement;

