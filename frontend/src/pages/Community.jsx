import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "../components/Community-Posts/PostCard";

export default function Community() {
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:8000/get_posts/");
      setData(response.data);
    };
    getData();
  }, []);

  if (!data) return null;
  return (
    <div>
      {data.map((datum, i) => {
        return <PostCard props={datum} />;
      })}
    </div>
  );
}
