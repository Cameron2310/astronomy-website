import IFrame from "../../components/IFrame";
import TopicInfo from "../../components/Topic-Info/TopicInfo";

export default function SunPage({ props }) {
  console.log(props);
  return (
    <div>
      <IFrame
        props={{ url: "https://solarsystem.nasa.gov/gltf_embed/2352&#39" }}
      />
      <TopicInfo props={{ data: props[0], isSubTopic: true }} />;
    </div>
  );
}
