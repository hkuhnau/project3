// Import useState and useEffect hooks from React
import React, { useState, useEffect } from 'react'

// Import the API category from AWS Amplify
import { API } from 'aws-amplify'

import './App.css';

function BornOnDay() {

  //Create a bornOn variable and set to empty array
  const [born, updateBorn] = useState([]);

  // Define function to all API
  const fetchBorn = async() => {
    const born = await API.get('project3', '/born');
    updateBorn(born.born);
  }

  // Call fetchCoins function when component loads
  useEffect(() => {
    fetchBorn()
  }, [])


  return (
    <div className="App">
        <div>
            <h1> The user {born.login} was born on {born.created_at}</h1>
          </div>
    </div>
  );
}

export default BornOnDay