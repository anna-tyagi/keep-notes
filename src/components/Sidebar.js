import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ subjects }) => {
  return (
    <div className="sidebar">
      <h2>Subjects</h2>
      <ul>
        {subjects.map((subject, index) => (
          <li key={index}>
            <Link to={`/subject/${subject}`}>{subject}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
