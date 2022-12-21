import axios from "axios";
import { useState, useEffect } from "react";
import "./Bibliography.css";

export default function Bibliography() {
  const [sources, setSources] = useState();

  useEffect(() => {
    const getSources = async () => {
      const response = await axios.get("http://localhost:8000/subtopics/");
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
