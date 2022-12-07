import Carousel from "react-bootstrap/Carousel";
import { useState, useEffect } from "react";
import axios from "axios";

import "./CarouselComp.css";
import { CarouselCaption } from "reactstrap";

export default function CarouselComp() {
  const [images, setImages] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios("http://localhost:8000/images/");
      setImages(response.data);
      console.log(response.data);
    };
    fetchData();
  }, []);

  if (!images) return null;
  return (
    <div>
      <Carousel>
        {images.map((image, i) => {
          return (
            <Carousel.Item key={i}>
              <img
                className="d-block w-100"
                style={{ height: "750px" }}
                src={image.url}
                alt={image.explanation}
              />
              <Carousel.Caption>
                <h3>{image.title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}
