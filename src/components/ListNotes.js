import React from 'react';
import Note from './Note';

const ListNotes = ({ notes, onDelete }) => {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <Note key={note._id} note={note} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ListNotes;
