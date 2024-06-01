// Editor.js
import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';

// Import the necessary Quill modules for syntax highlighting
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

// Register the modules
// Quill.register('modules/syntax', true);

const Editor = () => {
  const [content, setContent] = useState('');

  const handleContentChange = (value) => {
    setContent(value);
  };

  return (
    <div className="editor">
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
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'size': [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
     { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video', 'code-block'],
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
