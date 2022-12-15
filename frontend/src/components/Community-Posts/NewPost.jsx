import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { useRef, useState } from "react";
import {} from "react";

export default function NewPostModal({ setPosts, posts, verification }) {
  const [showURLField, setShowURLField] = useState(false);
  const text = useRef(null);
  const imageUrl = useRef("");

  async function createNewPost() {
    if (verification) {
      const response = await axios.post("http://localhost:8000/get_posts/", {
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
      <Form style={{ width: "30%", margin: "auto", marginTop: 10 }}>
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
          <Button variant="primary" onClick={() => createNewPost()}>
            Add Post
          </Button>
          <Button
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