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
import ProtectedRoute from './config/protectedRoute';
import PublicRoute from './config/publicRoute';
import Loader from "./components/Loader";


const App = () => {
  return (
    <div>
      <Suspense fallback={<Loader/>}>

      <Routes>

    {/* Public */}

    <Route element={<PublicRoute />}>

        <Route
            path="/"
            element={<LandingPage />}
        />

        <Route
            path="/login"
            element={<Login />}
        />

        <Route
            path="/register"
            element={<Register />}
        />

    </Route>

    {/* Protected */}

      <Route
          element={<ProtectedRoute />}
      >
          <Route
              path="/blog/dashboard"
              element={<Dashboard />}
          />
          <Route
              path="/blog/create"
              element={<CreateBlog />}
          />
          <Route
              path="/blog/edit/:blogId"
              element={<CreateBlog />}
          />

          <Route
            path="/blog/:blogId"
            element={<ViewABlog />}
        />
        
      </Route>      

      </Routes>
      </Suspense>
    </div>
  )
}

export default App