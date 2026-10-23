/* eslint-disable no-unused-vars */
import { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Pages/LandingPage';
import PrivacyPolicyPage from './components/Pages/PrivacyPolicyPage';
import NotFoundPage from './components/Pages/NotFoundPage';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>  
  )
}

export default App
