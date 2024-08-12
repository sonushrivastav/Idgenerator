import { createContext, useState, useRef, useEffect, useContext } from "react";

const ToastifyContext = createContext();

const Snackbar = ({ id, message, removeToastify }) => {
  const snackbarRef = useRef(null);

  useEffect(() => {
    snackbarRef.current.style.opacity = "1";
    snackbarRef.current.style.transition = "opacity 0.5s ease-in-out";

    const timer = setTimeout(() => {
        handleClose();
      }, 3000); 
  
      return () => clearTimeout(timer);

  }, []);

  const handleClose = () => {
    snackbarRef.current.style.opacity = "0";
    setTimeout(() => {
      removeToastify(id);
    }, 500);
  };

  return (
    <div ref={snackbarRef} className="snackbar">
      <span>{message}</span>
      <button className="close-btn" onClick={handleClose}>
        &times;
      </button>
    </div>
  );
};

export const ToastifyProvider = ({ children }) => {
  const [message, setMessage] = useState([]);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    processQueue();
  }, [message]);

  const showToastify = (msg) => {
    const id = Date.now();
    if (message.length < 3) {
      setMessage((prevMessages) => [...prevMessages, { id, message: msg }]);
    } else {
      setQueue((prevQueue) => [...prevQueue, { id, message: msg }]);
    }
  };

  const processQueue = () => {
    if (message.length < 3 && queue.length > 0) {
      const newMessage = queue.shift();
      setMessage((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  const removeToastify = (id) => {
    setMessage((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
  };

  return (
    <ToastifyContext.Provider value={{ showToastify }}>
      {children}
      <div className="snackbar-container">
        {message.map((msg) => (
          <Snackbar
            key={msg.id}
            id={msg.id}
            message={msg.message}
            removeToastify={removeToastify}
          />
        ))}
      </div>
    </ToastifyContext.Provider>
  );
};

export const useToastify = () => {
  const context = useContext(ToastifyContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};