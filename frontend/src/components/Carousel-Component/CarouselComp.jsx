import Carousel from "react-bootstrap/Carousel";
import { useState, useEffect } from "react";
import axios from "axios";
import "./CarouselComp.css";

export default function CarouselComp() {
  // Description:
  // Carousel component that rotates through 5 photos from the backend API
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("images/").catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
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
