import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { useRef, useState } from "react";
import "./NewPost.css";

export default function NewPostModal({ setPosts, posts, verification }) {
  // Description:
  // Component on top of page that allows user to add post

  // State variables
  const [showURLField, setShowURLField] = useState(false);
  const text = useRef(null);
  const imageUrl = useRef("");

  async function createNewPost() {
    if (verification) {
      const response = await axios.post("http://localhost:8000/posts/", {
        params: {
          user_id: verification,
          caption: text.current.value,
          imageUrl: imageUrl.current.value,
        },
      });
      setPosts([...posts, response.data]);
    } else window.location = "/login/";
  }

  return (
    <div>
      <Form className="newpost-form">
        <Form.Group className="mb-3" controlId="ControlTextarea2">
          <Form.Control type="text" placeholder="Create New Post" ref={text} />
          {showURLField ? (
            <Form.Control
              type="text"
              placeholder="Add image URL"
              ref={imageUrl}
            />
          ) : null}
          <Form.Text className="text-muted"></Form.Text>
          <Button
            className="newpost-button"
            variant="primary"
            onClick={() => createNewPost()}
          >
            Add Post
          </Button>
          <Button
            className="newpost-button"
            variant="primary"
            onClick={() => setShowURLField(!showURLField)}
          >
            Add Image
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
