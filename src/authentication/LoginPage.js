import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import './Auth.css';
import Authentication from '../firebase/authentication';
import LoadingComponent from '../component/loading';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isloading, setLoading] = useState(false);

  const auth = new Authentication();
  let navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    setLoading(true);
    auth.signInUser(email, password).then((result) => {
      if (result) {
        return navigate("/notes");
      }
      else {
        toast.error("Your email is not verified, verify your email using link sent on your email");
      }
    }).catch((e) => {
      toast.error(e);
    }).finally(() => {
      setLoading(false);
    })
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="intro-section">
        <h1 className="app-name">Daily Notes</h1>
        <p className="intro-text">Welcome to Daily Notes, your personal digital notebook to keep track of your tasks and ideas effortlessly.</p>
        <Link to="/signup" className="create-account-link">Create New Account</Link>
      </div>
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
      {isloading && <LoadingComponent message={"Signing into your account"} />}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
