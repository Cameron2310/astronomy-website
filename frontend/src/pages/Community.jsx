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
      const response = await axios.put("http://localhost:8000/posts/", {
        params: {
          post_id: post.id,
          likes: post.likes,
          userId: verification,
        },
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
      const response = await axios.delete("http://localhost:8000/posts/", {
        params: {
          post_id: post.id,
        },
      });
      setPosts(response.data);
    } else window.location = "/login/";
  }

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get("http://localhost:8000/posts/");
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
