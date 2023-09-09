import React, { useState } from 'react';

const Authentication = ({ onLogin, onRegister, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isLogin: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Check if it's a login or register action
    if (formData.isLogin) {
      // If it's a login, send the username and password to the onLogin function
      const { username, password } = formData;
      onLogin({ username, password });
    } else {
      // If it's a registration, send the email and password to the onRegister function
      const { email, password } = formData;
      onRegister({ email, password });
    }
    
    // Close the authentication component
    onClose();
  };

  return (
    <div className="authentication">
      <h2>{formData.isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleFormSubmit}>
        {!formData.isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleInputChange}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
        />
        <button type="submit">
          {formData.isLogin ? 'Login' : 'Register'}
        </button>
        <button
          type="button"
          onClick={() =>
            setFormData({ ...formData, isLogin: !formData.isLogin })
          }
        >
          {formData.isLogin ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </form>
    </div>
  );
};

export default Authentication;
