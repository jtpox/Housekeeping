import { useState, useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Navigation from './components/navigation';
import ProtectedRoute from './components/protectedRoute';

import Home from './routes/home';
import Dashboard from './routes/dashboard';
import UserDetails from './routes/user/details';
import ManageUsers from './routes/user/manage';
import NewUser from './routes/user/new';
import EditUser from './routes/user/edit';

import UserContext from './utils/userContext';

import { refreshDetails } from './api/user';

function App() {
  // const [count, setCount] = useState(0)
  const userDetailsFromLocalStorage = (localStorage.getItem('housekeeping'))?
    JSON.parse(localStorage.getItem('housekeeping')) : {};

  const [userDetails, setUserDetails] = useState(userDetailsFromLocalStorage);

  useEffect(() => {
    if(userDetails.token) {
      refreshDetails(userDetails.token).then(result => {
        const newUserDetails = {
          token: userDetails.token,
          user: result.data,
        };

        setUserDetails(newUserDetails);
        localStorage.setItem('housekeeping', JSON.stringify(newUserDetails));
      });
    }
  }, []);

  return (
    <div>
      <UserContext.Provider value={{userDetails, setUserDetails}}>
        {userDetails.token && <Navigation />}
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

            <Route path="manage" element={
              <ProtectedRoute>
                <ManageUsers />
              </ProtectedRoute>
            } />

            <Route path="new" element={
              <ProtectedRoute>
                <NewUser />
              </ProtectedRoute>
            } />

            <Route path=":userId" element={
              <ProtectedRoute>
                <EditUser />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
