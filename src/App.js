import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/home" /> } />
      <Route exact path="/home" element={ <Home /> } />
    </Routes>
  );
}

export default App;
