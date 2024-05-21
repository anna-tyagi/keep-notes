import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import AddNote from './components/AddNote';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const subjects = [...new Set(notes.map(note => note.subject))];

  return (
    <Router>
      <div className="app">
        <Sidebar subjects={subjects} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <AddNote addNote={addNote} />
                <NoteList notes={notes} />
              </>
            } />
            {subjects.map(subject => (
              <Route key={subject} path={`/subject/${subject}`} element={<NoteList notes={notes.filter(note => note.subject === subject)} />} />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
