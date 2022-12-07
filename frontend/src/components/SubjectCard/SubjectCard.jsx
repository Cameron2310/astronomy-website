import Card from "react-bootstrap/Card";

export default function SubjectCard({ props }) {
  return (
    <Card
      onClick={() => {
        window.location = `/${props.name}/`;
      }}
      style={{ width: "18rem", cursor: "pointer" }}
    >
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text></Card.Text>
      </Card.Body>
    </Card>
  );
}
