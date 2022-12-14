import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "../components/Community-Posts/PostCard";
import NewPost from "../components/Community-Posts/NewPost";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

export default function Community() {
  const [posts, setPosts] = useState();

  if (Cookies.get("UID")) {
    const userId = CryptoJS.AES.decrypt(Cookies.get("UID"), "secret key 123");
    var verification = JSON.parse(userId.toString(CryptoJS.enc.Utf8));
  }

  async function updateLikes(post) {
    if (verification) {
      const response = await axios.put("http://localhost:8000/get_posts/", {
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
      const response = await axios.delete("http://localhost:8000/get_posts/", {
        params: {
          post_id: post.id,
        },
      });
      setPosts(response.data);
    } else window.location = "/login/";
  }

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get("http://localhost:8000/get_posts/");
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
