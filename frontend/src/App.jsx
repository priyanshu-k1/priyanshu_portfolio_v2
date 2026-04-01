import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import LandingPage from './components/Pages/LandingPage';



function App() {
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
         <LandingPage/>
        }/>
      </Routes>
    </Router>  
  )
}

export default App


{/* <div className="flex h-screen w-screen items-center justify-center">
      
    </div> */}