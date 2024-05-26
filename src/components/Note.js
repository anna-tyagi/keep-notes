import React from 'react';

const Note = ({ note, onEdit, onAddImage }) => {
  return (
    <div className="note">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <small>{note.date}</small>
      {note.image && <img src={note.image} alt="Note" className="note-image" />}
      <button className="edit-button" onClick={() => onEdit(note)}>Edit</button>
      <button className="add-image-button" onClick={() => onAddImage(note)}>Add Image</button>
    </div>
  );
};

export default Note;
