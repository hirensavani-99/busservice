import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';


import { useSelector } from 'react-redux';

import Homepage from './Component/Homepage/Homepage';
import ShowBus from './Component/ShowBus/ShowBus'
import Header from './Component/NavBar/Header';
import SignIn from './Component/SigIn/SignIn';

import './App.css';


function App() {
  

  const userData = useSelector(state => state.handleUser)


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index path="/" element={<Homepage />} />
        <Route exact path="/relatedBus" element={<ShowBus />} />
        {!userData.user && <Route exact path="/signin" element={<SignIn />} />}
        {!userData.user && <Route exact path="/signup" element={<SignIn isSignUp={true} />} />}

      </Routes>

    </div>
  );
}

export default App;
