import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <span>
        <Link className="footer-links" to="/">
          Home
        </Link>
        <Link className="footer-links" to="/Bibliography/">
          Bibliography
        </Link>
        <Link className="footer-links" to="/Community/">
          Community
        </Link>
        <a
          href="https://github.com/Cameron2310/astronomy-website"
          className="footer-links"
        >
          Github
        </a>
      </span>
    </div>
  );
}
