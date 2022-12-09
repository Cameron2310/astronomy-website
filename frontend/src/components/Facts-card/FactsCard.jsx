import React from "react";

export default function FactsCard({ props }) {
  console.log(props);

  function convertKelvinToFahrenheit() {
    const temp = Math.round((props.avgTemp - 273.15) * (9 / 5) + 32);
    return temp;
  }

  return (
    <div>
      <p>Gravity: {props.gravity} m/s^2</p>
      <p>Average temperature: {convertKelvinToFahrenheit()}°F</p>
      <p>
        Closest {props.englishName} is to the Sun:{" "}
        {(0.62137 * props.perihelion).toLocaleString("en-US")} miles
      </p>
      <p>
        Farthest {props.englishName} is from the Sun:{" "}
        {(0.62137 * props.aphelion).toLocaleString("en-US")} miles
      </p>
    </div>
  );
}
