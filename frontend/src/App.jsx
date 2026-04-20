/* eslint-disable no-unused-vars */
import { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import LandingPage from './components/Pages/LandingPage';
import UnderConstructionPage from './components/Pages/UnderConstructionPage';



function App() {
  const [isUnderConstruction,setUnderConstruction] = useState(true);
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={
          <h1>Admin Panel</h1>
        }/>

        <Route path="/login" element={
          <h1>Login</h1>
        }/>

        <Route path="*" element={
          isUnderConstruction ? <UnderConstructionPage /> : <LandingPage />
        }/>
      </Routes>
    </Router>  
  )
}

export default App


{/* <div className="flex h-screen w-screen items-center justify-center">
      
    </div> */}