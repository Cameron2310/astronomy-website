import SubjectCard from "../SubjectCard/SubjectCard";

// Component for Topics & Subtopics which shows images & correlating articles

export default function TopicInfo({ topicInformation, isSubtopic }) {
  const article = topicInformation.article.split("\n");

  if (isSubtopic === false) {
    return (
      <div>
        <h2>{topicInformation.name}</h2>
        <br />
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
        <br />
        <p className="articles">
          {article.map((paragraph, i) => {
            return (
              <div>
                <p>{paragraph}</p>
                <img
                  src={topicInformation.article_images[i].url}
                  style={{ width: 600, border: "none" }}
                />
                <p>{topicInformation.article_images[i].source}</p>
              </div>
            );
          })}
        </p>
      </div>
    );
  }
}
