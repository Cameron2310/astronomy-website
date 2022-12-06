import { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const postUser = async () => {
    const post = await axios
      .post("http://localhost:8000/userlogin/", {
        params: {
          email: email,
          password: password,
        },
      })
      .then(function (post) {
        if (post.status == 200) {
          window.location = "/";
        } else {
          window.location = "login/";
        }
      })
      .catch(function () {
        window.location = "/login/";
      });
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
          type="text"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <button onClick={postUser}>Sign Up</button>
      </div>
    </div>
  );
}
