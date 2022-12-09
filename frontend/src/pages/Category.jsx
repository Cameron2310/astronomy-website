import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IFrame from "../components/IFrame";
import TopicInfo from "../components/Topic-Info/TopicInfo";

export default function Category() {
  const [data, setData] = useState();
  const { categoryName } = useParams();
  console.log(categoryName, data);

  useEffect(() => {
    const getData = async () => {
      const response = await axios("http://localhost:8000/categories/", {
        params: {
          categoryName: categoryName,
        },
      });
      setData(response.data);
    };
    getData();
  }, [categoryName]);

  if (!data) return null;
  return (
    <div>
      <IFrame props={{ url: data.three_d_model }} />
      <TopicInfo props={{ data: data, isSubtopic: false }} />
    </div>
  );
}
