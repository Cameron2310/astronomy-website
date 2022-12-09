import Subcategory from "../components/Subcategory/";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ArticlePage() {
  const [data, setData] = useState();
  const { subCategory } = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await axios("/subtopic/", {
        params: { name: subCategory },
      });
      setData(response.data);
      console.log(response.data);
    };
    getData();
  }, []);

  if (!data) return null;
  return (
    <div>
      <Subcategory
        props={{
          url: data.three_d_model,
          data: data,
        }}
      />
    </div>
  );
}
