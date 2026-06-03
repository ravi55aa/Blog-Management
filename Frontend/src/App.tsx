import {Suspense} from 'react';
import {Register,Login,LandingPage} from "./pages";
import {Routes, Route} from 'react-router-dom';


const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>

      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

      </Routes>
      </Suspense>
    </div>
  )
}

export default App