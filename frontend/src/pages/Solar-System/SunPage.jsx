import Subcategory from "../../components/Subcategory";
import axios from "axios";
import { useState, useEffect } from "react";

export default function SunPage() {
  const [subTopic, setSubTopic] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await axios("/finditem/", {
        params: { item_name: "Sun" },
      });
      setSubTopic(response.data);
    };
    getData();
  }, []);

  if (!subTopic) return null;
  return (
    <div>
      <Subcategory
        props={{
          url: subTopic.three_d_model,
          data: subTopic,
        }}
      />
    </div>
  );
}
