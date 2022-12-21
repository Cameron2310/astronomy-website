import "./IFrame.css";

export default function IFrame({ url }) {
  // Description:
  // Simple Iframe component that takes in a url

  return (
    <iframe
      className="website-iframe"
      src={url}
      frameborder="0"
      allowFullScreen
    />
  );
}
