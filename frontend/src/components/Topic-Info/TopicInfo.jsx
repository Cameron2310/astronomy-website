import SubjectCard from "../SubjectCard/SubjectCard";

// Component for Topics & Subtopics which shows images & correlating articles

export default function TopicInfo({ props }) {
  console.log(props);

  if (props.isSubTopic === false) {
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
        <p>{props.data.article}</p>
      </div>
    );
  }
}
