import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesList from './ShoesList';
import ShoesForm from './ShoesForm';
import React from 'react';
import { useState, useEffect } from "react";
import HatsList from './HatsList';
import HatForm from './HatForm'

function App(props) {
  const [shoes, setShoes] = useState([])
  const [hats, setHats] = useState([])

  const getShoes = async () => {
    const url = 'http://localhost:8080/api/shoes/'
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const shoes = data.shoes
      setShoes(shoes)
    }
  }

  const loadHats = async () => {
    const response = await fetch('http://localhost:8090/api/hats/');
    if (response.ok) {
      const data = await response.json();
      const hats = data.hats
      setHats(hats)
    }}

  useEffect(() => {
    getShoes();
    loadHats();
  }, [])

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="shoes/" element={<ShoesList shoes={shoes} getShoes={getShoes} />} />
          <Route path="shoes/new" element={<ShoesForm getShoes={getShoes}/>} />
          <Route path="hats/" element={<HatsList hats={hats} loadHats={loadHats}/>} />
          <Route path="hats/">
          <Route path="new" element={<HatForm loadHats={loadHats}/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}



// function App(props) {
//   if (props.hats === undefined) {
//     return null;
//   }
//   return (
//     <>
//       <Nav />
//       <div className="container">
//         <HatsList />
//       </div>
//     </>
//   );
// }

export default App;
