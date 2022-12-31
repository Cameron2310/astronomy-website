import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IFrame from "../components/IFrame/IFrame";
import TopicInfo from "../components/Topic-Info/TopicInfo";

export default function Category() {
  const [categoryData, setCategoryData] = useState();
  const { categoryName } = useParams();

  useEffect(() => {
    const getCategoryData = async () => {
      const response = await axios("categories/", {
        params: {
          categoryName: categoryName,
        },
      });
      setCategoryData(response.data);
    };
    getCategoryData();
  }, [categoryName]);

  if (!categoryData) return null;
  return (
    <div>
      <IFrame url={categoryData.three_d_model} />
      <TopicInfo topicInformation={categoryData} isSubtopic={false} />
    </div>
  );
}
