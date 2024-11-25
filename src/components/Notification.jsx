const Notification = ({ color, message }) => {
  if (message === null) {
    return null
  } else {
    return (
      <div className={`notification ${color}`}>
        {message}
      </div>
    )
  }
}

export default Notification