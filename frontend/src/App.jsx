/* eslint-disable no-unused-vars */
import { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Pages/LandingPage';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={
          <LandingPage />
        }/>
      </Routes>
    </Router>  
  )
}

export default App
