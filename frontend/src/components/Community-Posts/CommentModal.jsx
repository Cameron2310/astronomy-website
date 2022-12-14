import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function CommentModal({ post, show, setShow, verification }) {
  const [comments, setComments] = useState();
  const commentText = useRef(null);
  const handleClose = () => setShow(false);

  async function createNewComment() {
    if (verification) {
      const response = await axios.post("http://localhost:8000/comments/", {
        params: {
          post_id: post.id,
          comment_text: commentText.current.value,
          user_id: verification,
        },
      });
      setComments([...comments, response.data]);
    } else window.location = "/login/";
  }
  async function updateCommentLikes(comment) {
    if (verification) {
      const response = await axios.put("http://localhost:8000/comments/", {
        params: {
          comment_id: comment.id,
          comment_likes: comment.likes,
          user_id: verification,
        },
      });
      setComments(
        comments.map((comment) => {
          if (comment.id === response.data.id)
            return { ...comment, likes: response.data.likes };
          else return comment;
        })
      );
    } else window.location = "/login/";
  }
  async function deleteComment(comment) {
    if (verification) {
      const response = await axios.delete("http://localhost:8000/comments/", {
        params: {
          comment_id: comment.id,
          post_id: post.id,
        },
      });
      setComments(response.data);
    } else window.location = "/login/";
  }

  useEffect(() => {
    const getComments = async () => {
      const response = await axios.get("http://localhost:8000/comments/", {
        params: {
          id: post.id,
        },
      });
      setComments(response.data);
    };
    getComments();
  }, []);

  if (!comments) return null;
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        {comments.map((comment, i) => {
          return (
            <Modal.Body style={{ borderStyle: "dashed" }}>
              {comment.text} {comment.likes}
              <div>
                <Button
                  variant="primary"
                  onClick={() => deleteComment(comment)}
                >
                  Delete
                </Button>
                <Button
                  variant="primary"
                  onClick={() => updateCommentLikes(comment)}
                >
                  Like
                </Button>
              </div>
            </Modal.Body>
          );
        })}
        <Form>
          <Form.Group className="mb-3" controlId="ControlTextarea1">
            <Form.Control
              type="text"
              placeholder="Add new comment"
              ref={commentText}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => createNewComment()}>
            Add New Comment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
