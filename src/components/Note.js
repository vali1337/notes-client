import React from 'react';

const Note = ({ note, onDelete }) => {
  return (
    <div className="note">
      <div className="note-title">
        <h3>{note.title}</h3>
        <button onClick={() => onDelete(note._id)}>Delete</button>
      </div>
      <div className="note-content">
        {note.content}
      </div> 
    </div>
  );
};

export default Note;
