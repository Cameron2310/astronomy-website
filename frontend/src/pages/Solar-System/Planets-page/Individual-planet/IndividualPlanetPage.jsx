import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CardGroup from "react-bootstrap/CardGroup";

import IFrame from "../../../../components/IFrame/IFrame";
import FactsCard from "../../../../components/Facts-card/FactsCard";
import TopicInfo from "../../../../components/Topic-Info/TopicInfo";
import ResourceCard from "../../../../components/Resources/ResourceCard";
import "./IndividualPlanetPage.css";

export default function IndividualPlanetsPage() {
  const [planetData, setPlanetData] = useState();
  const [topicInformation, setTopicInformation] = useState();
  const { topicName } = useParams();
  console.log(topicInformation);

  useEffect(() => {
    const getPlanetData = async () => {
      const response = await axios(
        `https://api.le-systeme-solaire.net/rest/bodies?filter[]=englishName,eq,${topicName}`
      );
      setPlanetData(response.data.bodies[0]);
    };
    getPlanetData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await axios("/subtopic/", {
        params: {
          name: topicName,
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
      setTopicInformation(response.data);
    };
    getData();
  }, []);

  if (!topicInformation || !planetData) return null;
  return (
    <div>
      <IFrame url={topicInformation.three_d_model} />
      <div className="article-div">
        <FactsCard planetData={planetData} />
        <TopicInfo topicInformation={topicInformation} />
      </div>
      <h4>Additional Resources</h4>
      <CardGroup>
        {topicInformation.article_resources.map((resource, i) => {
          return <ResourceCard resourceInformation={resource} key={i} />;
        })}
      </CardGroup>
    </div>
  );
}
