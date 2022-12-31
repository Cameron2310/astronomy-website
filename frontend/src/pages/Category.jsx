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
      const response = await axios("/categories/", {
        params: {
          categoryName: categoryName,
        },
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
