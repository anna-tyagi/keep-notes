// Editor.js
import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';

// Import the necessary Quill modules for syntax highlighting
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import Header from '../component/Header';
import Authentication from '../firebase/authentication';
import { useNavigate } from 'react-router-dom';

// Register the modules
// Quill.register('modules/syntax', true);

const Editor = () => {
  const [content, setContent] = useState('');

  const auth = new Authentication();
  let navigate = useNavigate();

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleLogout = () => {
    // Add logout logic here
    auth.logout().then(() => {
      return navigate('/');
    })
    console.log('Logged out');
  };

  return (
    <div className="editor">
      <Header title="Daily Notes" onLogout={handleLogout} />
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        modules={Editor.modules}
        formats={Editor.formats}
      />
    </div>
  );
};

Editor.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }], [],
    [{ 'font': [] }, { 'size': [] }], [],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'], [],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, [],
    { 'indent': '-1' }, { 'indent': '+1' }], [],
    ['link', 'image', 'video', 'code-block'], [],
    ['clean']
  ],
  syntax: {
    highlight: text => hljs.highlightAuto(text).value,
  }
};

Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video', 'code-block'
];

export default Editor;
