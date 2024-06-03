import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Header from './Header';
import '../css/Genre.css';

const Genre = () => {
  const { genreId } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${config.apiBaseUrl}/api/items/genre/${genreId}`)
      .then(response => setItems(response.data))
      .catch(error => {
        console.error('Error fetching items:', error);
        alert('An error occurred while fetching items');
      });
  }, [genreId]);

  return (
    <div className="genre-page">
      <Header />
      <main>
        <h2>{genreId}</h2>
        <div className="items">
          {items.map(item => (
            <div key={item._id} className="product">
              <img src={item.image} alt={item.title} />
              <div className="product-info">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Genre;
