import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

export default function Dashboard() {
  const userId = CryptoJS.AES.decrypt(Cookies.get("UID"), "secret key 123");
  const decryptedUserId = JSON.parse(userId.toString(CryptoJS.enc.Utf8));
  const [userInformation, setUserInformation] = useState();
  const [planets, setPlanets] = useState();
  const [favoritePlanet, setFavoritePlanet] = useState();
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const saveData = async () => {
    const response = await axios.put("http://localhost:8000/userdata/", {
      params: {
        user_id: decryptedUserId,
        email: email,
        first_name: firstName,
        last_name: lastName,
        favorite_planet: favoritePlanet,
      },
    });
    console.log(response.data[0]);
    setUserInformation(response.data);
  };

  useEffect(() => {
    const getPlanets = async () => {
      const response = await axios(
        "https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,eq,true"
      );
      setPlanets(response.data);
    };
    getPlanets();
  }, []);

  useEffect(() => {
    const getUserInformation = async () => {
      const response = await axios("http://localhost:8000/userdata/", {
        params: {
          user_id: decryptedUserId,
        },
      });
      console.log(response.data);
      setUserInformation(response.data);
    };
    getUserInformation();
  }, []);

  if (!userInformation || !planets) return null;
  return (
    <Card className="login-card">
      <Card.Body>
        <Card.Text>
          <h2>Dashboard</h2>
          <input
            type="text"
            placeholder={"Email: " + userInformation.email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder={"First Name: " + userInformation.first_name}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder={"Last Name: " + userInformation.last_name}
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
        <Button variant="primary" type="submit" onClick={() => saveData()}>
          Save
        </Button>
      </Card.Body>
    </Card>
  );
}
