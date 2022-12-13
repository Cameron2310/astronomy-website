export default function IFrame({ url }) {
  console.log(url);
  return <iframe src={url} width="100%" height="450px" frameborder="0" />;
}
