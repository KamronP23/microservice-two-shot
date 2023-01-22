import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesList from './ShoesList';
import ShoesForm from './ShoesForm';
import React from 'react';
import { useState, useEffect } from "react";

function App(props) {
  const [shoes, setShoes] = useState([])

  const getShoes = async () => {
    const url = 'http://localhost:8080/api/shoes/'
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const shoes = data.shoes
      setShoes(shoes)
    }
  }

  useEffect(() => {
    getShoes();
  }, [])

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="shoes/" element={<ShoesList shoes={shoes} getShoes={getShoes} />} />
          <Route path="shoes/new" element={<ShoesForm getShoes={getShoes}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
