import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

export default function SignUp() {
  // Description:
  // User signup component

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const postUser = async () => {
    const response = await axios.post("http://localhost:8000/userlogin/", {
      params: {
        email: email,
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
    <div>
      <div>
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
      </div>
      <div>
        <button onClick={postUser}>Sign Up</button>
      </div>
      <p style={{ color: "red" }}>{error}</p>
    </div>
  );
}
