import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "../components/Community-Posts/PostCard/PostCard";
import NewPost from "../components/Community-Posts/NewPost/NewPost";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

export default function Community() {
  // State variables
  const [posts, setPosts] = useState();

  // Only logged in users can like posts & create posts
  if (Cookies.get("UID")) {
    const userId = CryptoJS.AES.decrypt(Cookies.get("UID"), "secret key 123");
    var verification = JSON.parse(userId.toString(CryptoJS.enc.Utf8));
  }

  // Functions to update likes and delete posts
  async function updateLikes(post) {
    if (verification) {
      const response = await axios
        .put("/posts/", {
          params: {
            post_id: post.id,
            likes: post.likes,
            userId: verification,
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
      setPosts(
        posts.map((post) => {
          if (post.id === response.data.id)
            return { ...post, likes: response.data.likes };
          else return post;
        })
      );
    } else window.location = "/login/";
  }
  async function deletePost(post) {
    if (verification) {
      const response = await axios
        .delete("/posts/", {
          params: {
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
      setPosts(response.data);
    } else window.location = "/login/";
  }

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get("/posts/").catch(function (error) {
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
      setPosts(response.data);
    };
    getPosts();
  }, []);

  if (!posts) return null;
  return (
    <div>
      <NewPost setPosts={setPosts} posts={posts} verification={verification} />
      {posts.map((post, i) => {
        return (
          <PostCard
            post={post}
            updateLikes={updateLikes}
            deletePost={deletePost}
            verification={verification}
          />
        );
      })}
    </div>
  );
}
