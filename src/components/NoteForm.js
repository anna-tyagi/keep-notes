import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NoteForm = ({ note, addNote, editNote, noteToEdit, clearNoteToEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
  const [image, setImage] = useState('');
  const [contextMenu, setContextMenu] = useState(null);

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setSubject(noteToEdit.subject);
      setImage(noteToEdit.image || '');
    } else {
      setTitle('');
      setContent('');
      setSubject('');
      setImage('');
    }
  }, [noteToEdit]);

  const handleSubmit = e => {
    e.preventDefault();
    const newNote = {
      title,
      content,
      subject,
      image,
    };

    if (noteToEdit) {
      editNote({
        ...noteToEdit,
        ...newNote,
      });
      clearNoteToEdit();
    } else {
      addNote({
        id: uuidv4(),
        ...newNote,
        date: new Date().toLocaleString(),
      });
    }

    setTitle('');
    setContent('');
    setSubject('');
    setImage('');
  };

  const handleImageUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    setContextMenu({
      x: e.pageX,
      y: e.pageY,
    });
  };

  const handleRemoveImage = () => {
    setImage('');
    setContextMenu(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={e => setSubject(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      ></textarea>

      {image && (
        <div style={{ position: 'relative' }}>
          <img src={image} alt="Note" className="note-image" onContextMenu={handleRightClick} />
          {contextMenu && (
            <div
              className="context-menu"
              style={{ top: contextMenu.y, left: contextMenu.x }}
              onClick={handleRemoveImage}
            >
              Remove Image
            </div>
          )}
        </div>
      )}

      <button type="button" className="add-image-button" id='add-image-outside' onClick={handleImageUpload}>Add Image</button>
      <button type="submit">{noteToEdit ? 'Update Note' : 'Add Note'}</button>
    </form>
  );
};

export default NoteForm;
