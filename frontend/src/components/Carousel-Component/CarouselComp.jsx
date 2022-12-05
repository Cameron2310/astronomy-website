import Carousel from "react-bootstrap/Carousel";
import { useState, useEffect } from "react";
import axios from "axios";

import "./CarouselComp.css";
import { CarouselCaption } from "reactstrap";

export default function CarouselComp() {
  const [images, setImages] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(
        "https://api.nasa.gov/planetary/apod?start_date=2022-11-05&end_date=2022-11-10&api_key="
      );
      const data = response.data.filter((image) => {
        return image.media_type === "image";
      });
      setImages(data);
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
                src={image.url}
                alt={image.explanation}
              />
              <Carousel.Caption>
                <h3>
                  <a href="">Click Here for More Information</a>
                </h3>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}
