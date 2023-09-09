import React, { useState } from 'react';
import './AddNote.css'; // Import the CSS file

function AddNote({ onNoteAdd }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  const handleNoteSubmit = (event) => {
    event.preventDefault();
    if (title.trim() === '' || content.trim() === '') {
      return;
    }

    onNoteAdd({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <div className="add-note">
      
        <form className="add-note-form show" onSubmit={handleNoteSubmit}>
          <h2>Add Note</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      
    </div>
  );
}

export default AddNote;
