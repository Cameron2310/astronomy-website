import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PhotoPage() {
  const { photoName } = useParams();
  const [photoData, setPhotoData] = useState();

  useEffect(() => {
    const fetchPhoto = async () => {
      const response = await axios("filter_images/", {
        params: { photo_name: photoName },
      });
      setPhotoData(response.data);
      console.log(response.data);
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
