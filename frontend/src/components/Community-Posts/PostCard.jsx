import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { PersonHeart } from "react-bootstrap-icons";
import { ChatLeftTextFill } from "react-bootstrap-icons";

import { useState } from "react";
import Cookies from "js-cookie";
import "./PostCard.css";
import axios from "axios";

export default function PostCard({ props }) {
  const [likes, setLikes] = useState(props.likes);

  function addLike() {
    const verification = Cookies.get("UID");
    if (verification) {
      const getLikes = async () => {
        const response = await axios.put("http://localhost:8000/get_posts/", {
          params: {
            id: props.id,
            likes: props.likes + 1,
            userId: Cookies.get("UID"),
          },
        });
        console.log(response.data);
        setLikes(response.data.likes);
      };
      getLikes();
    } else {
      window.location = "/login/";
    }
  }

  return (
    <div>
      <Card className="post-card">
        <Card.Img variant="top" src={props.image} />
        <Card.Body>
          <Card.Text className="caption">{props.caption}</Card.Text>
          <Card.Header>{likes} likes</Card.Header>
        </Card.Body>
        <Card.Header>
          <span className="icon-span">
            <Button className="post-button" onClick={addLike}>
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
