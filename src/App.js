import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AddNote from './components/AddNote';
import ListNotes from './components/ListNotes';
import Authentication from './components/Authentication'; // Import the Authentication component

function App() {
  const [notes, setNotes] = useState([]);
  const [showAddNoteForm, setShowAddNoteForm] = useState(false);
  const [showAuthentication, setShowAuthentication] = useState(false); // State to control the display of the authentication component

  useEffect(() => {
    fetch('/api/notes')
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleNoteAdd = (newNote) => {
    fetch('/api/notes/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then(() => {
        fetch('/api/notes')
          .then((response) => response.json())
          .then((data) => setNotes(data))
          .catch((error) => console.error('Error fetching data:', error));
      })
      .catch((error) => console.error('Error adding note:', error));

    setShowAddNoteForm(false);
  };

  const handleNoteDelete = (noteId) => {
    fetch(`/api/notes/${noteId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        fetch('/api/notes')
          .then((response) => response.json())
          .then((data) => setNotes(data))
          .catch((error) => console.error('Error fetching data:', error));
      })
      .catch((error) => console.error('Error deleting note:', error));
  };

  const handleLogin = (userData) => {
    // Define the user credentials (username and password)
    const credentials = {
      username: userData.username,
      password: userData.password,
    };

    // Send a POST request to your server for user authentication
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        if (!response.ok) {
          // Handle authentication failure, e.g., show an error message
          console.error('Authentication failed');
          throw new Error('Authentication failed');
        }
        // Authentication successful, parse the JWT token from the response
        return response.json();
      })
      .then((data) => {
        // Data should contain the JWT token
        const { token } = data;
        if (token) {
          // Save the token to localStorage or a secure storage method of your choice
          localStorage.setItem('token', token);
          // Close the Authentication component
          setShowAuthentication(false);
          // You can also update the UI or navigate to the user's dashboard
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        // Handle any errors, e.g., display an error message to the user
      });
  };

  const handleRegister = (userData) => {
    // Define the user data (username, email, and password)
    const { username, email, password } = userData;

    // Send a POST request to your server for user registration
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          // Handle registration failure, e.g., show an error message
          console.error('Registration failed');
          throw new Error('Registration failed');
        }
        // Registration successful, you can handle it as needed
        console.log('Registration successful');
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        // Handle any errors, e.g., display an error message to the user
      });
  };

  return (
    <div className="App">
      <Header user={''} onLogin={handleLogin}/>
      <main>
        {showAuthentication ? (
          <Authentication
            onLogin={handleLogin}
            onRegister={handleRegister}
            onClose={() => setShowAuthentication(false)}
          />
        ) : showAddNoteForm ? (
          <AddNote onNoteAdd={handleNoteAdd} />
        ) : (
          <>
            <button
              className="add-note-button"
              onClick={() => setShowAddNoteForm(true)}
            >
              Add Note
            </button>
            <ListNotes notes={notes} onDelete={handleNoteDelete} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
