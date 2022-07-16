import React, {useState, useEffect} from "react";
import Alert from "react-bootstrap/Alert";

const Message = ({ color, children }) => {
  const [show, setShow] = useState(true)

  // On componentDidMount set the timer
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShow(false)
    }, 3000)

    return () => {
      clearTimeout(timeId)
    }
  }, []);

    // If show is false the component will return null and stop here
    if (!show) {
      return null;
    }
  return (
    <div className={`alert alert-${color}`} role='alert'>
      {children}
    </div>
  );
};

export default Message;
