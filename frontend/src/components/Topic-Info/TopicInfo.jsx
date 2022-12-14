import SubjectCard from "../Subject-Card/SubjectCard";
import CardGroup from "react-bootstrap/CardGroup";
import "./TopicInfo.css";

export default function TopicInfo({ topicInformation, isSubtopic }) {
  // Description:
  // Component utilizes backend API on current subtopic to display title, article, images, and 3D models or videos

  const article = topicInformation.article.split("\n");

  if (isSubtopic === false) {
    return (
      <div>
        <h2>{topicInformation.name}</h2>
        <br />
        <p>{topicInformation.article}</p>
        <CardGroup className="card-group" style={{ justifyContent: "center" }}>
          {topicInformation.subtopics.map((subtopic, i) => {
            return (
              <div key={i}>
                <SubjectCard topicInformation={subtopic} />
              </div>
            );
          })}
        </CardGroup>
      </div>
    );
  } else {
    return (
      <div>
        <h2 className="article-header">{topicInformation.name}</h2>
        <br />
        <p className="articles">
          {article.map((paragraph, i) => {
            return (
              <div>
                <p>{paragraph}</p>
                <img
                  src={topicInformation.article_images[i].url}
                  style={{ width: "100%", border: "none" }}
                />
                <p className="source">
                  {topicInformation.article_images[i].source}
                </p>
              </div>
            );
          })}
        </p>
      </div>
    );
  }
}
