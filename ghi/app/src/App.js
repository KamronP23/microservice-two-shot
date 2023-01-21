import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatsList from './HatsList';
import React, { useEffect, useState} from 'react';
import HatForm from './HatForm'

function App(props) {
  // const [hats, setHats] = useState([])

  // const loadHats = async () => {
  //   const response = await fetch('http://localhost:8090/api/hats/');
  //   if (response.ok) {
  //     const data = await response.json();
  //     const hats = data.hats
  //     setHats(hats)
  //   }}
  //   useEffect(() => {
  //     loadHats()
  //   })

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
        <Routes>
          <Route path="hats/" element={<HatsList hats={props.hats} />} />
        </Routes>
        <Routes>
        <Route path="hats/">
          <Route path="new" element={<HatForm />} />
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
