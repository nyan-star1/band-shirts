import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import config from '../config';
import Header from './Header';
import '../css/LandingPage.css';

const LandingPage = () => {
  const { isLoggedIn, username } = useAuth();
  const [categories, setCategories] = useState([]);
  const [genres, setGenres] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {

    axios.get(`${config.apiBaseUrl}/api/genres`) // Ensure this matches the backend route
      .then(response => setGenres(response.data))
      .catch(error => console.error('Error fetching genres:', error));

    axios.get(`${config.apiBaseUrl}/api/items/new-arrivals`)
      .then(response => setNewArrivals(response.data))
      .catch(error => console.error('Error fetching new arrivals:', error));
  }, []);

  return (
    <div className="landing-page">
      <Header />
      <main>
        <div className="new-arrivals-section">
          <h2>New Arrivals</h2>
          <div className="new-arrivals">
            {newArrivals.map(item => (
              <div key={item._id} className="product">
                <img src={item.image} alt={item.title} />
                <div className="product-info">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2>Genres</h2>
        <div className="genres">
          {genres.map(genre => (
            <Link key={genre} to={`/genre/${genre}`} className="genre">
              <h3>{genre}</h3>
            </Link>
          ))}
        </div>
        <footer>
          <p>Go to your favorite rock genre to see apparel that suits how you rock!</p>
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;
