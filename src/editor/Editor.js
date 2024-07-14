import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import Header from '../component/Header';
import Authentication from '../firebase/authentication';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import NotesDatabase from '../firebase/notesDatabase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from '../component/loading';

const Editor = () => {
  const [content, setContent] = useState('');
  const [savedNote, setSavedNote] = useState('');
  const quillRef = useRef(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const unsavedChangesRef = useRef(unsavedChanges);
  const [date, setDate] = useState('');
  const [todaysDate, setTodaysDate] = useState('');
  const [notesList, setNotesList] = useState(null);
  const [index, setSelectedIndex] = useState(-1);

  const auth = new Authentication();
  const db = new NotesDatabase();
  let navigate = useNavigate();

  // loads all notes for sidebar
  useEffect(() => {
    db.getNotesBatch()
        .then((res) => {
          if (res === null) {
            setNotesList([]);
          } else {
            setNotesList(res.notes);
          }
          res.notes.forEach((notee, indexx) => {
            if (notee.note === content) {
              setSelectedIndex(indexx);
            }
          });
        })
        .catch((e) => {
          toast.error(e);
        });
  }, [savedNote]);

  // Update the ref whenever unsavedChanges changes
  useEffect(() => {
    unsavedChangesRef.current = unsavedChanges;
  }, [unsavedChanges]);

  // load today's date
  useEffect(() => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const isToday = (someDate) =>
        someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear();

    const isYesterday = (someDate) =>
        someDate.getDate() === yesterday.getDate() &&
        someDate.getMonth() === yesterday.getMonth() &&
        someDate.getFullYear() === yesterday.getFullYear();

    const formatDate = (someDate) => {
      if (isToday(someDate)) {
        return `Today, ${new Intl.DateTimeFormat('en-US', options).format(someDate)}`;
      } else if (isYesterday(someDate)) {
        return `Yesterday, ${new Intl.DateTimeFormat('en-US', options).format(someDate)}`;
      } else {
        return new Intl.DateTimeFormat('en-US', options).format(someDate);
      }
    };

    setTodaysDate(formatDate(today));
    setDate(formatDate(today));
  }, []);

  const onTitleChange = (title) => {
    setDate(title);
  }

  // get today's date
  const getFormattedDate = () => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(today);
  };

  const handleContentChange = (value) => {
    setContent(value);
    setUnsavedChanges(true); // Set unsaved changes to true when content changes
  };

  const handleLogout = () => {
    auth.logout().then(() => {
      navigate('/');
    });
    console.log('Logged out');
  };

  const getHeadings = (content) => {
    const div = document.createElement('div');
    div.innerHTML = content;
    const headings = Array.from(div.querySelectorAll('h1'));
    return headings;
  };

  // save note
  const saveNote = () => {
    const headings = getHeadings(content);
    const tags = headings.map((heading) => heading.textContent);
    if (index >= 0) {
      db.saveNote(content, date, tags, notesList[index].id)
          .then(() => {
            setSavedNote(content);
            setUnsavedChanges(false); // Set unsaved changes to false after saving
          })
          .catch((e) => {
            toast.error(e);
            console.log(e);
          });
    } else {

      console.log("save2",content)
      db.saveNote(content, date, tags)
          .then(() => {
            setSavedNote(content);
            setUnsavedChanges(false); // Set unsaved changes to false after saving
          })
          .catch((e) => {
            toast.error(e);
            console.log(e);
          });
    }
  };

  const handleNoteSelection = (index) => {
    setSelectedIndex(index);
    if (index < 0) {
      setContent('');
      setSavedNote('');
      setDate(todaysDate);
    } else {
      setContent(notesList[index].note);
      setSavedNote(notesList[index].note);
      setDate(notesList[index].date);
    }
  };

  if (notesList === null) {
    return <LoadingComponent />;
  }

  return (
      <div className="main-content">
        <Sidebar notesList={notesList} selectedIndex={index} setSelectedIndex={handleNoteSelection} />
        <div className="editor">
          <Header
              title={date}
              onLogout={handleLogout}
              hasUnsavedChanges={unsavedChanges}
              handleSaveNote={saveNote}
              onTitleChange={onTitleChange}
          />
          <ReactQuill
              ref={quillRef}
              value={content}
              onChange={handleContentChange}
              modules={Editor.modules}
              formats={Editor.formats}
          />
        </div>
        <ToastContainer />
      </div>
  );
};

Editor.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }],
    [{ 'font': [] }, { 'size': [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video', 'code-block'],
    ['clean']
  ],
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
};

Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video', 'code-block'
];

export default Editor;
