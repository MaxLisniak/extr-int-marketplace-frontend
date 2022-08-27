import "./NotFound.scss";
import { Link } from "react-router-dom";

const NotFound = () => {

  return (
    <div className="not-found">
      <div>
        <h1>404 Nothing Found...</h1>
        <p>
          <Link to="/">Go back to homepage</Link>
        </p>

      </div>
    </div>
  )
}

export default NotFound;