import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import IFrame from "../../components/IFrame";

export default function PlanetPage() {
  useEffect(() => {
    const getData = async () => {
      const response = await axios(
        "https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,eq,true"
      );
      console.log(response.data);
    };
    getData();
  }, []);

  return (
    <div>
      <div>
        <h2>Planet</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
          reprehenderit fugiat at odio perspiciatis reiciendis laudantium optio
          a repellendus ea? Voluptatum consectetur quod, quibusdam sed
          distinctio dolore aspernatur reiciendis cumque.
        </p>
      </div>
    </div>
  );
}
