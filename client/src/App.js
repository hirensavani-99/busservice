import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';


import { useSelector } from 'react-redux';


import Homepage from './Component/Homepage/Homepage';
import ShowBus from './Component/ShowBus/ShowBus'
import Header from './Component/NavBar/Header';
import SignIn from './Component/SigIn/SignIn';
import Admin from './Component/Admin/Admin';
import AddBus from './Component/Admin/AddBus';
import Chat from './Component/Chat/Chat'

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
        {userData.user && userData.user.isAdmin && <Route exact path="/admin" element={<Admin />} />}
        {userData.user && userData.user.isAdmin && <Route exact path="/addbus" element={<AddBus />} />}

      </Routes>
      <Chat />

    </div>
  );
}

export default App;
