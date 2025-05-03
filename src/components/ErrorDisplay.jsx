import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../styles/ErrorDisplay.css";

function ErrorDisplay({ error, resourceType, resourceId }) {
  const isNotFound = error?.message?.includes("404");
  const title = isNotFound ? "Resource Not Found" : "Error";
  const message = isNotFound
    ? `The ${resourceType} with ID ${resourceId} does not exist in this dimension.`
    : error?.message || "An unexpected error occurred. Please try again later.";

  return (
    <div className="error-display">
      <div className="error-display__content">
        <h1 className="error-display__title">{title}</h1>
        <p className="error-display__message">{message}</p>
        <div className="error-display__actions">
          <Link to={`/${resourceType}s`} className="error-display__link">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to {resourceType}s
          </Link>
          <Link to="/" className="error-display__link">
            <span className="material-symbols-outlined">home</span>
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

ErrorDisplay.propTypes = {
  error: PropTypes.object,
  resourceType: PropTypes.string.isRequired,
  resourceId: PropTypes.string.isRequired,
};

export default ErrorDisplay;
