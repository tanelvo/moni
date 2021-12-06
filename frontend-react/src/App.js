import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import './components/style.css'
import React from 'react';

function App() {

  const { pathname } = useLocation()

  return (
      <React.Fragment>
        { pathname !== '/login' && pathname !== '/register' && <NavigationBar /> }
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />}/>
          </Route> 
        </Routes>
      </React.Fragment>
  );
}

export default App;
