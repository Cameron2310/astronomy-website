import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { PersonHeart } from "react-bootstrap-icons";
import { ChatLeftTextFill } from "react-bootstrap-icons";
import CommentModal from "./CommentModal";

import { useState } from "react";
import "./PostCard.css";

export default function PostCard({ post, updateLikes, verification }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Card className="post-card">
        <Card.Img variant="top" src={post.image} />
        <Card.Body>
          <Card.Text className="caption">{post.caption}</Card.Text>
          <Card.Header>{post.likes} likes</Card.Header>
        </Card.Body>
        <Card.Header>
          <span className="icon-span">
            <Button className="post-button" onClick={() => updateLikes(post)}>
              <PersonHeart />
              &nbsp;Like
            </Button>
          </span>
          <span className="icon-span">
            <Button className="post-button" onClick={() => setShow(true)}>
              <ChatLeftTextFill />
              &nbsp;Comments
            </Button>
          </span>
        </Card.Header>

        <CommentModal
          post={post}
          show={show}
          setShow={setShow}
          post_id={post.id}
          verification={verification}
        />
      </Card>
    </div>
  );
}
