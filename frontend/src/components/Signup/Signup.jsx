import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import Card from "react-bootstrap/Card";
import "../Login/Login.css";
import Button from "react-bootstrap/Button";

export default function SignUp() {
  // Description:
  // User signup component

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const postUser = async () => {
    const response = await axios
      .post("/userlogin/", {
        params: {
          username: username,
          password: password,
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
    if (!response.data.id) {
      setError(response.data);
    } else {
      Cookies.set(
        "UID",
        CryptoJS.AES.encrypt(
          JSON.stringify(response.data.id),
          "secret key 123"
        ).toString(),
        { expires: 30, sameSite: "Lax" }
      );
      window.location = "/dashboard/";
    }
  };

  return (
    <Card className="login-card">
      <Card.Body>
        <Card.Title className="title">Sign Up</Card.Title>
        <Card.Text>
          <input
            className="user-input"
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            className="user-input"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Card.Text>
        <Button className="user-button" onClick={postUser}>
          Sign Up
        </Button>
        <p style={{ color: "red" }}>{error}</p>
      </Card.Body>
    </Card>
  );
}
