import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Navigation from './components/navigation';
import ProtectedRoute from './components/protectedRoute';

import Home from './routes/home';
import Dashboard from './routes/dashboard';

function App() {
  // const [count, setCount] = useState(0)
  const userDetailsFromLocalStorage = (localStorage.getItem('session'))?
    JSON.parse(localStorage.getItem('session')) : {};
  const [userDetails, setUserDetails] = useState(userDetailsFromLocalStorage);

  const mainPropData = {
    userDetails: [userDetails, setUserDetails],
  };
  return (
    <div>
      <Navigation data={mainPropData} />
      <div className="container mx-auto">
      <Routes>
        <Route
          path="/"
          element={
            <Home data={mainPropData} />
          } />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute data={mainPropData}>
              <Dashboard />
            </ProtectedRoute>
          } />
      </Routes>
      </div>
    </div>
  );
}

export default App;
