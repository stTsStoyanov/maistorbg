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
    <div>
      <Carousel activeIndex={index} onSelect={handleSelect} interval={null}  style={{ maxWidth: "700px", margin: "auto" }}>
        <Carousel.Item>
          <img
            className="carousel-image"
            src="https://scontent.fsof8-1.fna.fbcdn.net/v/t39.30808-6/330390474_539003138103316_3819318509734896522_n.png?_nc_cat=101&ccb=1-7&_nc_sid=e3f864&_nc_ohc=GD0w1KJEWm4AX8hZEUP&_nc_ht=scontent.fsof8-1.fna&oh=00_AfDTBAYY7hNgHrXjAPudWBtfNJzA-lJcF-20U8jgrJ92gQ&oe=644284E1"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel-image"
            src="https://uchilishtezajeni.com/wp-content/uploads/2022/05/4678253761265664.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel-image"
            src="https://ikeabg.azureedge.net/files/ImageGallery/Offers/GardenOffer/IKEA_15__Outdoor_Furniture_Banner_637x377.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Advertisement;

