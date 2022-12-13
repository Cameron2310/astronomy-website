import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { useRef, useEffect } from "react";

export default function NewPostModal({ setPosts, posts, verification }) {
  const text = useRef(null);

  async function createNewPost() {
    if (verification) {
      const response = await axios.post("http://localhost:8000/get_posts/", {
        params: {
          user_id: verification,
          caption: text.current.value,
        },
      });
      setPosts([...posts, response.data]);
    }
  }

  return (
    <div>
      <Form style={{ width: "30%", margin: "auto", marginTop: 10 }}>
        <Form.Group className="mb-3" controlId="ControlTextarea2">
          <Form.Control type="text" placeholder="Create New Post" ref={text} />
          <Form.Text className="text-muted"></Form.Text>
          <Button variant="primary" onClick={() => createNewPost()}>
            Add Post
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
