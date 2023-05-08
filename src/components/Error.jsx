import { useEffect } from "react";
import "./Error.css";

const Error = ({ errorMessage, setShowError }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <div className="bar error">{errorMessage}</div>;
};

export default Error;
