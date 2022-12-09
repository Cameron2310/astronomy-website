import { useState } from "react";
import SubjectCard from "../SubjectCard/SubjectCard";

// Component for Topics & Subtopics which shows images & correlating articles

export default function TopicInfo({ props }) {
  const [article, setArticle] = useState(() => {
    return props.data.article.split("\n");
  });
  console.log(article);

  if (props.isSubtopic === false) {
    return (
      <div>
        <h2>{props.data.name}</h2>
        <p>{props.data.article}</p>
        {props.data.subtopics.map((subtopic, i) => {
          return (
            <div key={i}>
              <SubjectCard props={subtopic} categoryName={{ name: null }} />
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <h2>{props.data.name}</h2>
        <p className="articles">
          {article.map((paragraph, i) => {
            return (
              <div>
                <p>{paragraph}</p>
                <br />
              </div>
            );
          })}
        </p>
      </div>
    );
  }
}
