import Card from "react-bootstrap/Card";
import CardImg from "react-bootstrap/esm/CardImg";

// Component for bootstrap cards

export default function SubjectCard({ props, categoryName }) {
  console.log(props, categoryName);
  return (
    <Card
      onClick={() => {
        if (categoryName === null) window.location = `/${props.name}/`;
        else {
          window.location = `/${props.categoryName}/${props.name}/`;
        }
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
