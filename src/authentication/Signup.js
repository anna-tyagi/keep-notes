import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import './Auth.css';

const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    // Add signup logic here
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="intro-section">
        <h1 className="app-name">Daily Notes</h1>
        <p className="intro-text">Sign up to start using Daily Notes, your personal digital notebook to keep track of your tasks and ideas.</p>
        <Link to="/" className="create-account-link">Login to your account</Link>
      </div>
      <div className="login-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="show-password" onClick={toggleShowPassword}>
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>
          </div>
          <button type="submit" className="login-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
