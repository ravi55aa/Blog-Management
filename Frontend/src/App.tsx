import {Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';

import {
  Register,
  Login,
  LandingPage,
  
  Dashboard,
  CreateBlog,

  ViewABlog,
} from "./pages";


const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>

      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/blog/dashboard" element={<Dashboard />} />
        
        <Route path="/blog/create" element={<CreateBlog />} />

        <Route path="/blog/edit/:blogId" element={<CreateBlog />} />

        <Route path="/blog/:blogId" element={<ViewABlog />} />

      </Routes>
      </Suspense>
    </div>
  )
}

export default App