import {Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';

import {
  Register,
  Login,
  LandingPage,
  
  Dashboard
} from "./pages";


const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>

      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/user/dashboard" element={<Dashboard />} />

      </Routes>
      </Suspense>
    </div>
  )
}

export default App