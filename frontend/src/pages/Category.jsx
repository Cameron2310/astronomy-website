import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopicInfo from "../components/Topic-Info/TopicInfo";

export default function Category() {
  const [data, setData] = useState();
  const { categoryName } = useParams();

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
  return <TopicInfo props={{ data: data, isSubTopic: false }} />;
}
