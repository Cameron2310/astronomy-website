import Card from "react-bootstrap/Card";

export default function ResourceCard({ resourceInformation }) {
  return (
    <Card
      onClick={() => {
        window.location = `${resourceInformation.resource_url}`;
      }}
      style={{
        width: "20rem",
        cursor: "pointer",
        height: "6rem",
        borderRadius: 10,
      }}
    >
      <Card.Body>
        <Card.Title>{resourceInformation.resource_name}</Card.Title>
        <br />
        <Card.Text className="text">
          {resourceInformation.resource_summary}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
