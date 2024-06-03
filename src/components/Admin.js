import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import config from '../config';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import '../css/Admin.css';

const Admin = () => {
  const { token, role } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [genre, setGenre] = useState('rock'); // Default genre
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/'); // Redirect non-admin users to home page
    }
  }, [role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.apiBaseUrl}/api/items`, {
        title,
        description,
        image,
        genre
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.status === 201) {
        setSuccessMessage('Item added successfully');
        setTitle('');
        setDescription('');
        setImage('');
        setGenre('rock');
      }
    } catch (error) {
      setErrorMessage('Error adding item. Please try again.');
    }
  };

  return (
    <div className="admin-container">
      <Header />
      <div className="main-content">
        <form onSubmit={handleSubmit} className="admin-form">
          <h2>Add New Item</h2>
          <label>
            Apparel name:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            Apparel img url:
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
          </label>
          <label>
            Sub-genre:
            <select value={genre} onChange={(e) => setGenre(e.target.value)} required>
              <option value="rock">Rock</option>
              <option value="pop">Pop</option>
              <option value="punk">Punk</option>
              <option value="metal">Metal</option>
            </select>
          </label>
          <label>
            Apparel description:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength="100" required />
          </label>
          <button type="submit">Add Item</button>
          {errorMessage && <div className="feedback-message">{errorMessage}</div>}
          {successMessage && <div className="feedback-message">{successMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default Admin;
