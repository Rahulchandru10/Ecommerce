
const Loginalert = ({ message, type }) => {
  return (
    <div>
      <div className={`alert alert-${type}`} role="alert">
            {message}
      </div>
    </div>
  )
}

export default Loginalert;
