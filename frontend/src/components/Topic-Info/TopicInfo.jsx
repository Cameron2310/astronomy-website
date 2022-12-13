import { useState } from "react";
import SubjectCard from "../SubjectCard/SubjectCard";

// Component for Topics & Subtopics which shows images & correlating articles

export default function TopicInfo({ topicInformation, isSubtopic }) {
  const [article, setArticle] = useState(() => {
    return topicInformation.article.split("\n");
  });

  if (isSubtopic === false) {
    return (
      <div>
        <h2>{topicInformation.name}</h2>
        <p>{topicInformation.article}</p>
        {topicInformation.subtopics.map((subtopic, i) => {
          return (
            <div key={i}>
              <SubjectCard topicInformation={subtopic} />
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <h2>{topicInformation.name}</h2>
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
