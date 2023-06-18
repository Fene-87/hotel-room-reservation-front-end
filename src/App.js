/* eslint-disable */
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import RoomList from './pages/RoomList';
import Reservations from './pages/Reservations';
import AddReservation from './pages/AddReservation';
import NavbarPC from './components/NavbarPC';
import './App.css';
import MobNav from './components/MobNav';
import AddRoom from './pages/AddRoom';
import Login from './pages/Login';
import Details from './pages/details/Details';

function App() {
  const isLoggedIn = localStorage.getItem('logged_user') ? true : false;

  const handleLogout = () => {
    localStorage.removeItem('logged_user');
    localStorage.removeItem('user_data');
    window.location.href = '/login';
  }

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn && (
          <>
            <MobNav handleLogout={handleLogout} />
            <NavbarPC handleLogout={handleLogout} />
          </>
        )}
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Home /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/rooms"
            element={
              isLoggedIn ? <RoomList /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/reservations"
            element={
              isLoggedIn ? <Reservations /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/AddReservation/:id"
            element={
              isLoggedIn ? <AddReservation /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/addRoom"
            element={
              isLoggedIn ? <AddRoom /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
