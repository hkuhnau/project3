// Import useState and useEffect hooks from React
import React, { useState, useEffect } from 'react'

// Import the API category from AWS Amplify
import { API } from 'aws-amplify'

import './App.css';
import BornOnDay from './BornOnDay';

function App() {
  // Create coins variable and set to empty array
  const [items, updateCoins] = useState([])

  //Create additional state to hold user input for limit and start props
  const [input, updateInput] = useState({ limit: 5, start: 0});

  //Create a variable for loading
  const [loading, updateLoading] = useState(true);

  //Crate a new function to allow users to update the input values
  function updateInputValues(type, value) {
    updateInput({...input, [type]: value});
  }

  // Define function to all API
  const fetchCoins = async() => {
    updateLoading(true);
    const {limit, start} = input;
    const data = await API.get('project3', `/items?limit=${limit}&start=${start}`);
    updateCoins(data.items);
    updateLoading(false);
  }

  // Call fetchCoins function when component loads
  useEffect(() => {
    fetchCoins()
  }, [])

  return (
    <>
    <div className="App">
      <input
        onChange={e => updateInputValues('limit', e.target.value)}
        placeholder="limit"
      />
      <input
        onChange={e => updateInputValues('start', e.target.value)}
        placeholder="start"
      />
      <button onClick={fetchCoins}>Fetch Coins</button>
      {loading && <h2>Loading...</h2>}
      {
        !loading && items.map((item, index) => (
          <div key={index}>
            <h2>{item.name} - {item.symbol}</h2>
            <h5>${item.price_usd}</h5>
          </div>
        ))
      }
    </div>
    <BornOnDay/>
    </>
  );
}

export default App
