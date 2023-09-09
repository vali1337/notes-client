import React, { useState } from 'react';
import Authentication from './Authentication';

const Header = ({ user, onLogin }) => {
  const [showAuthentication, setShowAuthentication] = useState(false);

  const toggleAuthentication = () => {
    setShowAuthentication(!showAuthentication);
  };

  return (
    <header>
      <h1>My Notes App</h1>
      {user ? (
        <p>Welcome, {user.username}</p>
      ) : (
        <button onClick={toggleAuthentication}>
          {showAuthentication ? 'Cancel' : 'Login / Register'}
        </button>
      )}

      {showAuthentication && (
        <Authentication onLogin={onLogin} onClose={toggleAuthentication} />
      )}
    </header>
  );
};

export default Header;
