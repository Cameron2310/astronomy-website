import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { PersonHeart } from "react-bootstrap-icons";
import { ChatLeftTextFill } from "react-bootstrap-icons";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./PostCard.css";
import axios from "axios";

export default function PostCard({ props }) {
  const [likes, setLikes] = useState(() => getPost());
  const [updatedLikes, setUpdatedLikes] = useState();
  const [count, setCount] = useState(0);

  function getPost() {
    axios
      .get("http://localhost:8000/filter_post/", {
        params: {
          id: props.id,
        },
      })
      .then((response) => {
        setLikes(response.data.likes);
      });
  }

  function manageLikes() {
    const verification = Cookies.get("UID");
    if (verification) {
      const getLikes = async () => {
        const response = await axios.put("http://localhost:8000/get_posts/", {
          params: {
            id: props.id,
            likes: likes,
            userId: Cookies.get("UID"),
          },
        });
        setCount((count) => count + 1);
      };
      getLikes();
    } else {
      window.location = "/login/";
    }
  }

  useEffect(() => {
    setUpdatedLikes(likes);
  }, [likes]);

  useEffect(() => {
    getPost();
  }, [count]);

  return (
    <div>
      <Card className="post-card">
        <Card.Img variant="top" src={props.image} />
        <Card.Body>
          <Card.Text className="caption">{props.caption}</Card.Text>
          <Card.Header>{updatedLikes} likes</Card.Header>
        </Card.Body>
        <Card.Header>
          <span className="icon-span">
            <Button className="post-button" onClick={() => manageLikes()}>
              <PersonHeart />
              &nbsp;Like
            </Button>
          </span>
          <span className="icon-span">
            <Button className="post-button">
              <ChatLeftTextFill />
              &nbsp;Comment
            </Button>
          </span>
        </Card.Header>
      </Card>
    </div>
  );
}
