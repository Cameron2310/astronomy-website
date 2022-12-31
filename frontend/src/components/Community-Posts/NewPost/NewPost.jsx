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
      const response = await axios
        .post("/posts/", {
          params: {
            user_id: verification,
            caption: text.current.value,
            imageUrl: imageUrl.current.value,
          },
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
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
