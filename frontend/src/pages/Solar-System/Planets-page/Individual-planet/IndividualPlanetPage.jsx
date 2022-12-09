import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import IFrame from "../../../../components/IFrame";
import FactsCard from "../../../../components/Facts-card/FactsCard";

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
      const response = await axios("/finditem/", {
        params: {
          item_name: topicName,
        },
      });
      console.log(response.data);
      setData(response.data);
    };
    getData();
  }, []);

  if (!data || !planetData) return null;
  return (
    <div>
      <IFrame props={{ url: data.three_d_model }} />
      <div>
        <h2>{data.name}</h2>
        <FactsCard props={planetData} />
        <p>{data.article}</p>
      </div>
    </div>
  );
}
