import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CommentModal from "../Comments/CommentModal";
import UserProfileModal from "../../User-Profile-Modal/UserProfileModal";
import "./PostCard.css";

export default function PostCard({
  post,
  updateLikes,
  verification,
  deletePost,
}) {
  // Description:
  // Component that shows individual post

  const [show, setShow] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  return (
    <div>
      <Card className="post-card">
        <Card.Header
          className="post-header-top"
          onClick={() => setShowUserProfile(true)}
        >
          Posted by {post.author.username}
        </Card.Header>
        <Card.Img variant="top" src={post.image} />
        <Card.Body className="post-body">
          <Card.Text className="caption">{post.caption}</Card.Text>
          <Card.Header className="likes">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>{" "}
            {post.likes} likes
          </Card.Header>
        </Card.Body>
        <Card.Header className="post-header">
          <span className="icon-span">
            <Button className="post-button" onClick={() => updateLikes(post)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person-heart"
                viewBox="0 0 16 16"
              >
                <path d="M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4Zm13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276Z" />
              </svg>
              &nbsp;Like
            </Button>
            <Button className="post-button" onClick={() => setShow(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chat-left-text-fill"
                viewBox="0 0 16 16"
              >
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z" />
              </svg>
              &nbsp;Comments
            </Button>
            {post.author.id == verification ? (
              <Button className="post-button" onClick={() => deletePost(post)}>
                &nbsp;Delete
              </Button>
            ) : null}
          </span>
        </Card.Header>
        <CommentModal
          post={post}
          show={show}
          setShow={setShow}
          post_id={post.id}
          verification={verification}
        />
        <UserProfileModal
          post={post}
          showUserProfile={showUserProfile}
          setShowUserProfile={setShowUserProfile}
        />
      </Card>
    </div>
  );
}
