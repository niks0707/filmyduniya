import React, { useState } from 'react'
import Header from './components/Header'
import Cards from './components/Cards'
import { Route, Routes } from 'react-router-dom';
import AddMovie from './components/AddMovie';
import Details from './components/Details';
import { createContext } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';

const Appstate = createContext();

function App() {
  const [login,setLogin] = useState(false);
  const [username,setUsername] = useState("");

  return (
    <Appstate.Provider value={{login,username,setLogin,setUsername}}>
      <div className='App relative'>
        <Header />
        <Routes>
          <Route path='/filmyduniya' element={<Cards />} />
          <Route path='/addmovie' element={<AddMovie />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
        </Routes>
      </div>
    </Appstate.Provider>
  );
}

export default App

export {Appstate}