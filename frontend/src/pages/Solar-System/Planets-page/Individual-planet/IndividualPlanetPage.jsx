import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import IFrame from "../../../../components/IFrame";
import FactsCard from "../../../../components/Facts-card/FactsCard";
import TopicInfo from "../../../../components/Topic-Info/TopicInfo";

export default function IndividualPlanetsPage() {
  const [planetData, setPlanetData] = useState();
  const [data, setData] = useState();
  const { topicName } = useParams();

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
      setData(response.data);
    };
    getData();
  }, []);

  if (!data || !planetData) return null;
  return (
    <div>
      <IFrame url={data.three_d_model} />
      <div>
        <FactsCard planetData={planetData} />
        <TopicInfo topicInformation={data} />
      </div>
    </div>
  );
}
