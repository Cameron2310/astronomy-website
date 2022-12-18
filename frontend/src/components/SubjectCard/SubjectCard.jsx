import Card from "react-bootstrap/Card";
import CardImg from "react-bootstrap/esm/CardImg";

export default function SubjectCard({ topicInformation }) {
  // Description:
  // Component that utilizes bootstrap card to display subtopic names on each category page
  return (
    <Card
      onClick={() => {
        window.location = `${topicInformation.name}/`;
      }}
      style={{ width: "18rem", cursor: "pointer" }}
    >
      <Card.Body>
        <Card.Title>{topicInformation.name}</Card.Title>
        <Card.Text className="text">
          <CardImg className="card-img" src={topicInformation.image} />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
