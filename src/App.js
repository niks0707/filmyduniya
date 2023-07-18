import React from 'react'
import Header from './components/Header'
import Cards from './components/Cards'
import { Route, Routes } from 'react-router-dom';
import AddMovie from './components/AddMovie';
import Details from './components/Details';

function App() {
  return (
    <div className='App relative'>
      <Header />
      <Routes>
        <Route path='/filmyduniya' element={<Cards />} />
        <Route path='/addmovie' element={<AddMovie />} />
        <Route path='/details/:id' element={<Details />} />
      </Routes>
    </div>
  );
}

export default App

