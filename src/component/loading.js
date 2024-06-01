import React from 'react';
import './loading.css';

const LoadingComponent = ({ message }) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default LoadingComponent;
