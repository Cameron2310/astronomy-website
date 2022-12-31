import axios from "axios";
import { useState, useEffect } from "react";
import "./Bibliography.css";

export default function Bibliography() {
  const [sources, setSources] = useState();

  useEffect(() => {
    const getSources = async () => {
      const response = await axios.get("/subtopics/").catch(function (error) {
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
      setSources(
        response.data.filter((source) => {
          if (source.source != "") return source;
        })
      );
    };
    getSources();
  }, []);

  if (!sources) return null;
  return (
    <>
      <h2 className="biblio-header">Bibliography</h2>
      {sources.map((source, i) => {
        return (
          <div>
            <h4 className="source-name">{source.name}</h4>
            <p className="source-content">{source.source}</p>
          </div>
        );
      })}
    </>
  );
}
