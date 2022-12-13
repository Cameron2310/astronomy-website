import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopicInfo from "../components/Topic-Info/TopicInfo";
import IFrame from "../components/IFrame";

export default function ArticlePage() {
  const [topicInformation, setTopicInformation] = useState();
  const { subCategory } = useParams();

  useEffect(() => {
    const getSubtopicData = async () => {
      const response = await axios("/subtopic/", {
        params: { name: subCategory },
      });
      setTopicInformation(response.data);
    };
    getSubtopicData();
  }, []);

  if (!topicInformation) return null;
  return (
    <div>
      <IFrame url={topicInformation.three_d_model} />
      <TopicInfo topicInformation={topicInformation} />
    </div>
  );
}
