import Card from "react-bootstrap/Card";
import "./headerImages.css";

export default function HeaderImage() {
  return (
    <Card.Img
      className="header-images"
      variant="top"
      src="https://cdn.pixabay.com/photo/2014/08/09/21/30/solar-system-414388_1280.jpg"
    />
  );
}
