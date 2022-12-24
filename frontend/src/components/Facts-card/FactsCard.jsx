import Card from "react-bootstrap/Card";
import "./FactsCard.css";

export default function FactsCard({ planetData }) {
  // Description:
  // Component that shows quick facts for each individual planet

  function convertKelvinToFahrenheit() {
    const temp = Math.round((planetData.avgTemp - 273.15) * (9 / 5) + 32);
    return temp;
  }

  return (
    <Card className="fact-card">
      <Card.Title className="fun-facts">Fun Facts</Card.Title>
      <Card.Text className="fact-card-text">
        <p>Gravity: {planetData.gravity} m/s^2</p>
        <p>Average temperature: {convertKelvinToFahrenheit()}°F</p>
        <p>
          Closest {planetData.englishName} is to the Sun:{" "}
          {(0.62137 * planetData.perihelion).toLocaleString("en-US")} miles
        </p>
        <p>
          Farthest {planetData.englishName} is from the Sun:{" "}
          {(0.62137 * planetData.aphelion).toLocaleString("en-US")} miles
        </p>
      </Card.Text>
    </Card>
  );
}
