import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";

import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const getUser = async () => {
    const response = await axios.get("http://localhost:8000/userlogin/", {
      params: {
        email: email,
        password: password,
      },
    });
    if (response.status == 200) {
      window.location = `/dashboard/${response.data.id}/`;
    } else {
      window.location = "login/";
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
            type="text"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
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
