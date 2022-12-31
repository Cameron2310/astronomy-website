import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import "./CommentModal.css";

export default function CommentModal({ post, show, setShow, verification }) {
  // Description:
  // Component that shows all the comments for the post

  // State variables
  const [comments, setComments] = useState();
  const commentText = useRef(null);
  const handleClose = () => setShow(false);

  // Functions that handle creating, deleting, & liking comments
  async function createNewComment() {
    if (verification) {
      const response = await axios
        .post("/comments/", {
          params: {
            post_id: post.id,
            comment_text: commentText.current.value,
            user_id: verification,
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
      setComments([...comments, response.data]);
    } else window.location = "/login/";
  }
  async function updateCommentLikes(comment) {
    if (verification) {
      const response = await axios
        .put("/comments/", {
          params: {
            comment_id: comment.id,
            comment_likes: comment.likes,
            user_id: verification,
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
      const response = await axios
        .delete("/comments/", {
          params: {
            comment_id: comment.id,
            post_id: post.id,
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
      setComments(response.data);
    } else window.location = "/login/";
  }

  // useEffect makes backend request to get comments for current post
  useEffect(() => {
    const getComments = async () => {
      const response = await axios
        .get("/comments/", {
          params: {
            id: post.id,
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
      setComments(response.data);
    };
    getComments();
  }, []);

  if (!comments) return null;
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="comment-header">
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>

        {/* Each comment is mapped out and given a delete & like button */}

        {comments.map((comment, i) => {
          return (
            <Modal.Body className="comment-body">
              <p>Comment by: {comment.author.username}</p>
              {comment.text} {comment.likes} likes
              <div>
                {comment.author.id == verification ? (
                  <Button
                    className="comment-button"
                    onClick={() => deleteComment(comment)}
                  >
                    Delete
                  </Button>
                ) : null}
                <Button
                  className="comment-button"
                  onClick={() => updateCommentLikes(comment)}
                >
                  Like
                </Button>
              </div>
            </Modal.Body>
          );
        })}
        {/* Form to create new comments */}

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
        <Modal.Footer className="comments-footer">
          <Button className="close-button" onClick={handleClose}>
            Close
          </Button>
          <Button className="comment-button" onClick={() => createNewComment()}>
            Add New Comment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
