import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import '../css/Item.css'; // Ensure you create and import a corresponding CSS file

const Item = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get(`${config.apiBaseUrl}/api/items/${itemId}`)
      .then(response => setItem(response.data))
      .catch(error => {
        console.error('Error fetching the item:', error);
        alert('An error occurred while fetching the item');
      });
  }, [itemId]);

  return (
    item ? (
      <div className="item-page">
        <h1>{item.title}</h1>
        <img src={item.image} alt={item.title} />
        <p>{item.description}</p>
      </div>
    ) : (
      <p>Loading...</p>
    )
  );
};

export default Item;
