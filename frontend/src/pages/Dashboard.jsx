import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";

export default function Dashboard() {
  const getUserData = async () => {
    const response = await axios("http://localhost:8000/userdata/", {
      params: {
        user_id: userId,
      },
    });
    setData(response.data);
    console.log(response.data);
  };

  const { userId } = useParams();

  const [count, setCount] = useState();
  const [data, setData] = useState(() => getUserData());
  const [planets, setPlanets] = useState();
  const [favoritePlanet, setFavoritePlanet] = useState();
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  useEffect(() => {
    const getPlanets = async () => {
      const response = await axios(
        "https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,eq,true"
      );
      setPlanets(response.data);
      console.log(response.data);
    };
    getPlanets();
  }, []);

  useEffect(() => {
    getUserData();
  }, [count]);

  const saveData = async () => {
    const response = await axios.put("http://localhost:8000/userdata/", {
      params: {
        user_id: userId,
        email: email,
        first_name: firstName,
        last_name: lastName,
        favorite_planet: favoritePlanet,
      },
    });
    console.log(response.data);
    setCount((count) => count + 1);
  };

  if (!data || !planets) return null;
  return (
    <Card className="login-card">
      <Card.Body>
        <Card.Text>
          <h2>Dashboard</h2>
          <input
            type="text"
            placeholder={data.email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder={data.first_name}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder={data.last_name}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <Form.Select
            size="sm"
            onChange={(e) => {
              setFavoritePlanet(e.target.value);
            }}
          >
            <option>What's your favorite planet?</option>
            {planets.bodies.map((planet, i) => {
              return (
                <option value={planet.englishName}>{planet.englishName}</option>
              );
            })}
          </Form.Select>
        </Card.Text>
        <Button variant="primary" type="submit" onClick={saveData}>
          Save
        </Button>
      </Card.Body>
    </Card>
  );
}
