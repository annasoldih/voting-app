import { Routes, Route } from 'react-router-dom';
import React from 'react';
import VotingProvider from './contextAPI/VotingProvider';
import Board from './pages/Board';
import Vote from './pages/Vote';
import Login from './pages/Login';
import { Home } from './pages/Home';
import '../src/index.css';

function App() {
  return (
    <VotingProvider>
      <Routes>
        <Route path="/vote" element={<Vote />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Board />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </VotingProvider>

  );
}

export default App;
