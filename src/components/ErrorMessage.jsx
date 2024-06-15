const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div>
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>retry</button>}
    </div>
  );
};

export default ErrorMessage;
