import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AddNote = ({ addNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const newNote = {
      id: uuidv4(),
      title,
      content,
      date: new Date().toLocaleString(),
      subject
    };
    addNote(newNote);
    setTitle('');
    setContent('');
    setSubject('');
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
      <button type="submit">Add Note</button>
    </form>
  );
};

export default AddNote;
