import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardGroup from "react-bootstrap/CardGroup";

import TopicInfo from "../components/Topic-Info/TopicInfo";
import ResourceCard from "../components/Resources/ResourceCard";
import IFrame from "../components/IFrame/IFrame";

export default function ArticlePage() {
  const [topicInformation, setTopicInformation] = useState();
  const { subCategory } = useParams();

  useEffect(() => {
    const getSubtopicData = async () => {
      const response = await axios("/subtopic/", {
        params: { name: subCategory },
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
      setTopicInformation(response.data);
    };
    getSubtopicData();
  }, []);

  if (!topicInformation) return null;
  return (
    <div>
      <IFrame url={topicInformation.three_d_model} />
      <TopicInfo topicInformation={topicInformation} />
      <h4>Additional Resources</h4>
      <CardGroup>
        {topicInformation.article_resources.map((resource, i) => {
          return <ResourceCard resourceInformation={resource} key={i} />;
        })}
      </CardGroup>
    </div>
  );
}
