import Card from "react-bootstrap/Card";
import CardImg from "react-bootstrap/esm/CardImg";

// Component for bootstrap cards

export default function SubjectCard({ props }) {
  console.log(props);
  return (
    <Card
      onClick={() => {
        window.location = `${props.name}/`;
      }}
      style={{ width: "18rem", cursor: "pointer" }}
    >
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          <CardImg className="card-img" src={props.image} />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
