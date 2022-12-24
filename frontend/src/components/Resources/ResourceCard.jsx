import Card from "react-bootstrap/Card";
import "./ResourceCard.css";

export default function ResourceCard({ resourceInformation }) {
  return (
    <Card
      className="resource-card"
      onClick={() => {
        window.location = `${resourceInformation.resource_url}`;
      }}
    >
      <Card.Body className="resource-card-text">
        <Card.Title>{resourceInformation.resource_name}</Card.Title>
        <br />
        <Card.Text className="text">
          {resourceInformation.resource_summary}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
