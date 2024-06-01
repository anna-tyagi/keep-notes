import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Sidebar from './sidebar/Sidebar';
import './App.css';
import LoginPage from './authentication/LoginPage';
import SignupPage from './authentication/Signup';
import Editor from './editor/Editor';

import firebaseConfig from './firebase/firebaseConfig';
import Authentication from './firebase/authentication';

import { initializeApp } from 'firebase/app';
import LoadingComponent from './component/loading';



const App = () => {

  initializeApp(firebaseConfig);

  const [initialised, setInitialized] = useState(null);

  let auth = new Authentication();
  useEffect(() => {
    auth.getAccess().then((result) => {
      setInitialized(true);
    }).catch((e) => {
      console.error(e);
    })
  });

  const AuthorizedRoute = ({ element }) => {
    return auth.getIsSignedIn() === true ? element : <Navigate to="/" />;
  };
  const UnauthorizedRoute = ({ element }) => {
    return auth.getIsSignedIn() === true ? <Navigate to="/notes" /> : element;
  };

  if (initialised === null) {
    return (
      <LoadingComponent />
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UnauthorizedRoute element={<LoginPage />} />} />
        <Route path="/signup" element={<UnauthorizedRoute element={<SignupPage />} />} />
        <Route path="/notes" element={
          <AuthorizedRoute element={
            <div className="main-content">
              <Sidebar />
              <Editor />
            </div>
          } />
        } />
      </Routes>

    </Router>
  );
};

export default App;
