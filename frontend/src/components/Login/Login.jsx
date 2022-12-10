import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import axios from "axios";

import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const getUser = async () => {
    const response = await axios.get("http://localhost:8000/userlogin/", {
      params: {
        email: email,
        password: password,
      },
    });
    if (!response.data.id) {
      setError(response.data);
    } else {
      Cookies.set("isLoggedIn", true, { expires: 30 });
      window.location = `/dashboard/${response.data.id}/`;
    }
  };

  return (
    <Card className="login-card">
      <Card.Body>
        <Card.Title>Login</Card.Title>
        <Card.Text>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <p style={{ color: "red" }}>{error}</p>
        </Card.Text>
        <Button variant="primary" type="submit" onClick={getUser}>
          Login
        </Button>
        <br />
        <Link to="/signup/">New? Sign up for an account!</Link>
      </Card.Body>
    </Card>
  );
}
