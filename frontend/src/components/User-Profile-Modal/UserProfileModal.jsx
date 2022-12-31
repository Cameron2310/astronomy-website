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
      const response = await axios
        .get("/userdata/", {
          params: {
            user_id: post.author.id,
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
