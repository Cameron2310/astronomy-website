import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import axios from "axios";
import CryptoJS from "crypto-js";
import "./Login.css";

export default function Login() {
  // Description:
  // Simple Login Component

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const getUser = async () => {
    const response = await axios.get("http://localhost:8000/userlogin/", {
      params: {
        username: username,
        password: password,
      },
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
        <Card.Title className="title">Login</Card.Title>
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
          <p style={{ color: "red" }}>{error}</p>
        </Card.Text>
        <Button className="user-button" type="submit" onClick={() => getUser()}>
          Login
        </Button>
        <br />
        <Link className="signup-link" to="/signup/">
          New? Sign up for an account!
        </Link>
      </Card.Body>
    </Card>
  );
}
