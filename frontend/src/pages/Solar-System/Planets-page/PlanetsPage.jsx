import axios from "axios";
import { useEffect, useState } from "react";
import { CardGroup, Col, Row } from "reactstrap";
import SubjectCard from "../../../components/Subject-Card/SubjectCard";
import IFrame from "../../../components/IFrame/IFrame";
import TopicInfo from "../../../components/Topic-Info/TopicInfo";
import "./PlanetsPage.css";

export default function PlanetPage() {
  const [data, setData] = useState();
  const [subTopic, setSubTopic] = useState();

  // Icons for planet cards
  const images = [
    "https://cdn-icons-png.flaticon.com/512/2739/2739612.png",
    "https://cdn-icons-png.flaticon.com/512/3594/3594270.png",
    "https://cdn-icons-png.flaticon.com/512/3256/3256085.png",
    "https://cdn-icons-png.flaticon.com/512/124/124582.png",
    "https://cdn-icons-png.flaticon.com/512/3590/3590284.png",
    "https://cdn-icons-png.flaticon.com/512/1448/1448909.png",
    "https://cdn-icons-png.flaticon.com/512/360/360707.png",
    "https://cdn-icons-png.flaticon.com/512/3594/3594089.png",
  ];

  useEffect(() => {
    const getPlanetData = async () => {
      const response = await axios(
        "https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,eq,true&order=aphelion,asc"
      );
      setData(response.data);
    };
    getPlanetData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await axios
        .get("/subtopic/", {
          params: { name: "Planets" },
        })
        .catch(function (error) {
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
      setSubTopic(response.data);
    };
    getData();
  }, []);

  if (!data || !subTopic) return null;
  return (
    <div>
      <IFrame
        url={
          "https://sketchfab.com/models/b6b69a95a6f0426bb8bbc2e8cb7ff46a/embed"
        }
      />
      <TopicInfo topicInformation={subTopic} isSubtopic={true} />

      <CardGroup>
        <Row xs={1} md={3}>
          {data.bodies.map((planet, i) => {
            return (
              <Col md={3}>
                <SubjectCard
                  topicInformation={{
                    data: planet,
                    name: planet.englishName,
                    image: images[i],
                    categoryName: subTopic.name,
                  }}
                  key={i}
                />
              </Col>
            );
          })}
        </Row>
      </CardGroup>
    </div>
  );
}
