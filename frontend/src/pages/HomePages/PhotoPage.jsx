import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PhotoPage() {
  const { photoName } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios("http://localhost:8000/filter_images/", {
        params: { photo_name: photoName },
      });
      setData(response.data);
      console.log(response.data);
    };
    fetchData();
  }, []);

  if (!data) return null;
  return (
    <div>
      <img src={data.url} alt={data.title} />
      <h2>{data.title}</h2>
      <p className="articles">{data.explanation}</p>
    </div>
  );
}
