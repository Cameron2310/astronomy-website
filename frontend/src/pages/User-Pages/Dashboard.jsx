import { useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

import "./Dashboard.css";

export default function Dashboard() {
  // Description:
  // Component that shows user information

  const userId = CryptoJS.AES.decrypt(Cookies.get("UID"), "secret key 123");
  const decryptedUserId = JSON.parse(userId.toString(CryptoJS.enc.Utf8));
  const [userInformation, setUserInformation] = useState();
  const [planets, setPlanets] = useState();
  const favoritePlanet = useRef("");
  const username = useRef("");
  const firstName = useRef("");
  const lastName = useRef("");

  const clearInputs = () => {
    username.current.value = "";
    firstName.current.value = "";
    lastName.current.value = "";
  };

  const saveData = async () => {
    const response = await axios
      .put("/userdata/", {
        params: {
          user_id: decryptedUserId,
          username: username.current.value,
          first_name: firstName.current.value,
          last_name: lastName.current.value,
          favorite_planet: favoritePlanet.current.value,
        },
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
    setUserInformation(response.data[0]);
    clearInputs();
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
      const response = await axios
        .get("/userdata/", {
          params: {
            user_id: decryptedUserId,
          },
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
      setUserInformation(response.data);
    };
    getUserInformation();
  }, []);

  if (!userInformation || !planets) return null;
  return (
    <Card className="dashboard-card">
      <Card.Body>
        <Card.Text className="input-fields">
          <h2>Dashboard</h2>
          <input
            className="dashboard-inputs"
            type="text"
            placeholder={"Username: " + userInformation.username}
            ref={username}
          />
          <input
            className="dashboard-inputs"
            type="text"
            placeholder={"First Name: " + userInformation.first_name}
            ref={firstName}
          />
          <input
            className="dashboard-inputs"
            type="text"
            placeholder={"Last Name: " + userInformation.last_name}
            ref={lastName}
          />
          <Form.Select
            className="dashboard-form"
            size="sm"
            ref={favoritePlanet}
          >
            <option>What's your favorite planet?</option>
            {planets.bodies.map((planet, i) => {
              return (
                <option value={planet.englishName}>{planet.englishName}</option>
              );
            })}
          </Form.Select>
        </Card.Text>
        <Button
          className="user-button"
          variant="primary"
          type="submit"
          onClick={() => saveData()}
        >
          Save
        </Button>
      </Card.Body>
    </Card>
  );
}
