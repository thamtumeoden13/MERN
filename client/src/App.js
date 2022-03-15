import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar';
import Home from './components/Home';
import Auth from './components/Auth';

function App()  {

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        {/* <HomePage /> */}
        <NavBar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/auth' exact element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
