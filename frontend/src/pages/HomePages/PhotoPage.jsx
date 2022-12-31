import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PhotoPage() {
  const { photoName } = useParams();
  const [photoData, setPhotoData] = useState();

  useEffect(() => {
    const fetchPhoto = async () => {
      const response = await axios("/filter_images/", {
        params: { photo_name: photoName },
      }).catch(function (error) {
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
      setPhotoData(response.data);
    };
    fetchPhoto();
  }, []);

  if (!photoData) return null;
  return (
    <div>
      <img src={photoData.url} alt={photoData.title} />
      <h2>{photoData.title}</h2>
      <p className="articles">{photoData.explanation}</p>
    </div>
  );
}
