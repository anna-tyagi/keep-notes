import React, { useState } from 'react';
import './Sidebar.css';
import { FaCalendarAlt, FaTags, FaPlus } from 'react-icons/fa';

const Sidebar = () => {
  const [sortBy, setSortBy] = useState('date');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSortByChange = (value) => {
    setSortBy(value);
    // Clear search query when switching sort options
    setSearchQuery('');
  };

  return (
    <div className="sidebar">
      <div className="header">
        <h3>Notes</h3>
        <div className="create-note">
          <FaPlus className="create-note-icon" />
          <span>New</span>
        </div>
      </div>
      <div className="sort-section">
        <h4>Sort By</h4>
        <div className="dropdown">
          <select
            value={sortBy}
            onChange={(e) => handleSortByChange(e.target.value)}
          >
            <option value="date">Date</option>
            <option value="topic">Topics</option>
          </select>
        </div>
        {sortBy === 'topic' && (
          <div className="search-box">
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
      </div>
        <h4 style={{'fontSize':'1.2rem', 'paddingBottom':'20px'}}>All Notes</h4>
      <div className="notes-list">
        <div className="scrollable-notes">
          {/* Dummy list for testing */}
          {Array.from(Array(10).keys()).map((noteId) => (
            <div key={noteId} className="note-item">
              <h5>Note Title {noteId + 1}</h5>
              <p>Note content goes here...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
