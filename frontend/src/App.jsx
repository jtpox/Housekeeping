import { useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Navigation from './components/navigation';
import ProtectedRoute from './components/protectedRoute';

import Home from './routes/home';
import Dashboard from './routes/dashboard';
import UserDetails from './routes/user/details';

import UserContext from './utils/userContext';

function App() {
  // const [count, setCount] = useState(0)
  const userDetailsFromLocalStorage = (localStorage.getItem('housekeeping'))?
    JSON.parse(localStorage.getItem('housekeeping')) : {};
  const [userDetails, setUserDetails] = useState(userDetailsFromLocalStorage);

  return (
    <div>
      <UserContext.Provider value={{userDetails, setUserDetails}}>
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={
              <Home />
            } />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          <Route path="user">
            <Route path="details" element={
              <ProtectedRoute>
                <UserDetails />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
