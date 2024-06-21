const Notification = ({ message, errorMessage }) => {
  if (errorMessage) {
    return <div className='notification error'>{errorMessage}</div>;
  } else if (message) {
    return <div className='notification'>{message}</div>;
  } else {
    return null;
  }
};

export default Notification;
