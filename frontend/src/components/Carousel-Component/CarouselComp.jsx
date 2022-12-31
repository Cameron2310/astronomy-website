import Carousel from "react-bootstrap/Carousel";
import { useState, useEffect } from "react";
import axios from "axios";
import "./CarouselComp.css";

export default function CarouselComp() {
  // Description:
  // Carousel component that rotates through 5 photos from the backend API
  const [images, setImages] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios
        .get("http://localhost:8000/images/")
        .catch((error) => {
          if (!error.response) {
            // network error
            errorStatus = "Error: Network Error";
          } else {
            errorStatus = error.response.data.message;
          }
        });
      console.log("running ...");
      console.log(response.data);
      setImages(response.data);
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
                className="carousel-image"
                src={image.url}
                alt={image.explanation}
              />
              <a href={`Photos/${image.title}/`}>
                <Carousel.Caption>
                  <h3>{image.title}</h3>
                </Carousel.Caption>
              </a>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}
