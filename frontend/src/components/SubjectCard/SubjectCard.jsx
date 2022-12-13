import Card from "react-bootstrap/Card";
import CardImg from "react-bootstrap/esm/CardImg";

// Component for bootstrap cards

export default function SubjectCard({ topicInformation }) {
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
