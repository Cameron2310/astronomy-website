import Card from "react-bootstrap/Card";
import CardImg from "react-bootstrap/esm/CardImg";

export default function SubjectCard({ topicInformation }) {
  // Description:
  // Component that utilizes bootstrap card to display subtopic names on each category page
  return (
    <Card
      className="topic-card"
      onClick={() => {
        window.location = `${topicInformation.name}/`;
      }}
      style={{ width: "16rem", cursor: "pointer" }}
    >
      <Card.Body>
        <Card.Title>{topicInformation.name}</Card.Title>
        <Card.Text className="planetcard-text">
          <CardImg src={topicInformation.image} className="card-image" />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
