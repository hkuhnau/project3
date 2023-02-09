// Import useState and useEffect hooks from React
import React, { useState, useEffect } from 'react'

// Import the API category from AWS Amplify
import { API } from 'aws-amplify'

import './App.css';

function App() {
  // Create coins variable and set to empty array
  const [items, updateCoins] = useState([])

  // Define function to all API
  async function fetchCoins() {
    const data = await API.get('project3', '/items')
    updateCoins(data.items)
  }

  // Call fetchCoins function when component loads
  useEffect(() => {
    fetchCoins()
  }, [])

  return (
    <div className="App">
      {
        items.map((item, index) => (
          <div key={index}>
            <h2>{item.name} - {item.symbol}</h2>
            <h5>${item.price_usd}</h5>
          </div>
        ))
      }
    </div>
  );
}

export default App
