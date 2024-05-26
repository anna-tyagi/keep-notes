import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const editNote = (updatedNote) => {
    setNotes(notes.map(note => (note.id === updatedNote.id ? updatedNote : note)));
  };

  const clearNoteToEdit = () => {
    setNoteToEdit(null);
  };

  //Adding Image
  const addImageToNote = (note) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const updatedNote = { ...note, image: reader.result };
          editNote(updatedNote);
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
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
                <NoteForm
                  addNote={addNote}
                  editNote={editNote}
                  noteToEdit={noteToEdit}
                  clearNoteToEdit={clearNoteToEdit}
                />
                <NoteList notes={notes} onEdit={setNoteToEdit} onAddImage={addImageToNote} />
              </>
            } />
            {subjects.map(subject => (
              <Route key={subject} path={`/subject/${subject}`} element={
                <>
                  <NoteForm
                    addNote={addNote}
                    editNote={editNote}
                    noteToEdit={noteToEdit}
                    clearNoteToEdit={clearNoteToEdit}
                  />
                  <NoteList notes={notes.filter(note => note.subject === subject)} onEdit={setNoteToEdit} />
                </>
              } />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
