import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "../components/Community-Posts/PostCard";
import NewPost from "../components/Community-Posts/NewPost";
import Cookies from "js-cookie";

export default function Community() {
  const [posts, setPosts] = useState();
  const verification = Cookies.get("UID");

  async function updateLikes(post) {
    if (verification) {
      const response = await axios.put("http://localhost:8000/get_posts/", {
        params: {
          id: post.id,
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
    }
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
            verification={verification}
          />
        );
      })}
    </div>
  );
}
