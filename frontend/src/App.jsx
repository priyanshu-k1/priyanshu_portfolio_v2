/* eslint-disable no-unused-vars */
import { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Pages/LandingPage';
import UnderConstructionPage from './components/Pages/UnderConstructionPage';



function App() {
  const [isUnderConstruction,setUnderConstruction] = useState(true);
  return (
    <Router>
      <Routes>
        <Route path="*" element={
          isUnderConstruction ? <UnderConstructionPage /> : <LandingPage />
        }/>
      </Routes>
    </Router>  
  )
}

export default App
