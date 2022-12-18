import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CardGroup from "react-bootstrap/CardGroup";

import IFrame from "../../../../components/IFrame";
import FactsCard from "../../../../components/Facts-card/FactsCard";
import TopicInfo from "../../../../components/Topic-Info/TopicInfo";
import ResourceCard from "../../../../components/ResourceCard";

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
      });
      setTopicInformation(response.data);
    };
    getData();
  }, []);

  if (!topicInformation || !planetData) return null;
  return (
    <div>
      <IFrame url={topicInformation.three_d_model} />
      <div>
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
