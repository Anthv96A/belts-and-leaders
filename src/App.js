import React from 'react';
import Leaderboard from './components/containers/Leaderboard/Leaderboard';
import Header from './components/containers/Header/Header';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Header />
      <div className='MainBody'>
        <Leaderboard />
      </div>
    </div>
  );
}

export default App;
