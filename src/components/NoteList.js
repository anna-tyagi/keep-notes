import React from 'react';
import Note from './Note';

const NoteList = ({ notes, onEdit, onAddImage }) => {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <Note key={note.id} note={note} onEdit={onEdit} onAddImage={onAddImage} />
      ))}
    </div>
  );
};

export default NoteList;


