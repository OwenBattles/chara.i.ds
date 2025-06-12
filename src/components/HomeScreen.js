import React, { useState } from 'react';
import './HomeScreen.css';

function HomeScreen() {
  const [category, setCategory] = useState('');

  return (
    <div className="home-screen">
      <h1 className="app-title">Chara.i.ds</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-input"
        />
      </div>
    </div>
  );
}

export default HomeScreen; 