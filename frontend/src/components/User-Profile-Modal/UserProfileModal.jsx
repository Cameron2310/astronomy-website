import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";

import "./UserProfileModal.css";

export default function UserProfileModal({
  showUserProfile,
  setShowUserProfile,
  post,
}) {
  const [userData, setUserData] = useState();
  const handleClose = () => setShowUserProfile(false);

  useEffect(() => {
    const getUserProfile = async () => {
      const response = await axios.get("http://localhost:8000/userdata/", {
        params: {
          user_id: post.author.id,
        },
      });
      setUserData(response.data);
    };
    getUserProfile();
  }, []);

  if (!userData) return null;
  return (
    <>
      <Modal show={showUserProfile} onHide={handleClose}>
        <Modal.Header className="userprofile-header">
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Username: {userData.username}</h5>
          <h5>
            Name: {userData.first_name} {userData.last_name}
          </h5>
          <h5>Favorite Planet: {userData.favorite_planet}</h5>
        </Modal.Body>
        <Modal.Footer className="userprofile-footer">
          <Button className="userprofile-close-button" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
