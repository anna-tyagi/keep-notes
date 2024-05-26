import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';

import './App.css';
import LoginPage from './authentication/LoginPage';
import SignupPage from './authentication/Signup';
import Note from './components/Note';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/notes" element={
            <div className="main-content">
              <Sidebar />
              <Note />
            </div>
          } />
        </Routes>

    </Router>
  );
};

export default App;
