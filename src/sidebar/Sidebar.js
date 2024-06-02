import React, { useState } from 'react';
import './Sidebar.css';
import { FaCalendarAlt, FaTags, FaPlus } from 'react-icons/fa';

const Sidebar = ({ notesList, selectedIndex, setSelectedIndex }) => {
  const [sortBy, setSortBy] = useState('date');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSortByChange = (value) => {
    setSortBy(value);
    setSearchQuery('');
  };

  const handleNoteClick = (index) => {
    setSelectedIndex(index);
  };
  return (
    <div className="sidebar">
      <div className="header">
        <h3>Notes</h3>
        <div className="create-note" onClick={() => handleNoteClick(-1)}>
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
      <h4 style={{ fontSize: '1.2rem', paddingBottom: '20px' }}>All Notes</h4>
      <div className="notes-list">
        <div className="scrollable-notes">
          {Array.isArray(notesList) && notesList.length > 0 ? (
            notesList.map((note, index) => (
              <div
              key={index}
              className={`note-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleNoteClick(index)}
            >
              <div className="tags-container">
                {note.tags.map((tag, tagIndex) => (
                  <div key={tagIndex} className="tag">
                    {tag}
                  </div>
                ))}
              </div>
              <h5>{note.date}</h5>
            </div>
            ))
          ) : (
            <p>No notes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
