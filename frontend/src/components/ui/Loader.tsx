// Kommentar
import "./Loader.css";
const Loader = () => {
  return (
    <div className="loader-container">
      <svg
        className="loader__spin1"
        width="45"
        height="45"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="22"
          cy="22"
          fill="none"
          r="15"
          strokeWidth="5"
          stroke="#CC8D80"
          strokeDasharray="60 140"
        />
      </svg>
    </div>
  );
};

export default Loader;
