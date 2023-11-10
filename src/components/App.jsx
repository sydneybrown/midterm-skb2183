import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes.js";

var nextKey = getMaxKey(notes) + 1;

function App() {
  const [inputText, setInput] = useState({
    key: nextKey,
    title: "",
    content: ""
  });
  const [currentNotes, setNotes] = useState(notes);

  function handleChange(event) {
    const { value, name } = event.target;

    setInput((prevValue) => {
      if (name === "title") {
        return {
          title: value,
          content: prevValue.content
        };
      } else if (name === "content") {
        return {
          title: prevValue.title,
          content: value
        };
      }
    });
  }

  function addNote() {
    nextKey++;
    setNotes((prevNotes) => {
      return [...prevNotes, inputText];
    });
    setInput({
      key: nextKey,
      title: "",
      content: ""
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      const ind = prevNotes.findIndex((note) => {
        return note.key === id;
      });
      if (ind > -1) prevNotes.splice(ind, 1);
      return [...prevNotes];
    });
  }

  function createNote(note) {
    return (
      <Note
        key={note.key}
        id={note.key}
        title={note.title}
        content={note.content}
        deleteNote={deleteNote}
      />
    );
  }

  return (
    <div>
      <Header />
      <div className="note-creator">
        <input
          name="title"
          onChange={handleChange}
          type="text"
          placeholder="Title"
          value={inputText.title}
        />
        <input
          name="content"
          onChange={handleChange}
          type="text"
          placeholder="Take a note..."
          value={inputText.content}
        />
        <button onClick={addNote}>
          <span>Add</span>
        </button>
      </div>
      <div />
      {currentNotes.map(createNote)}
      <Footer />
    </div>
  );
}
function getMaxKey(notes) {
  var max = 1;
  for (var n of notes) {
    if (n.key > max) max = n.key;
  }
  return max;
}

export default App;
