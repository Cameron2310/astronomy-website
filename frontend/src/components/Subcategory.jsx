import IFrame from "./IFrame";
import TopicInfo from "./Topic-Info/TopicInfo";

export default function Subcategory({ props }) {
  console.log(props);
  return (
    <div>
      <IFrame
        props={{
          url: props.url,
        }}
      ></IFrame>
      <div>
        <TopicInfo props={{ data: props.data }} />
      </div>
    </div>
  );
}
