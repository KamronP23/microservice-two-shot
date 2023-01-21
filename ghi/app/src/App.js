import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesList from './ShoesList';
import ShoesForm from './ShoesForm';
import React from 'react';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      {/* <div className="container"> */}
        <Routes>
          <Route path="/" element={<MainPage />} />
        {/* </Routes> */}
        {/* <Routes> */}
          <Route path="shoes/" element={<ShoesList shoes={props.shoes} />} />
          <Route path="shoes/new" element={<ShoesForm />} />
        </Routes>
      {/* </div> */}
    </BrowserRouter>
  );
}

// function App(props) {
//   if (props.shoes === undefined) {
//     return null;
//   }
//   return (
//     <>
//       <Nav />
//       <div className="container">
//         <ShoesList shoes={props.shoes} />
//       </div>
//     </>
//   );
// }

export default App;
