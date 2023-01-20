import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatsList from './HatsList';
import React from 'react';

// function App(props) {
//   return (
//     <BrowserRouter>
//       <Nav />
//       <div className="container">
//         <Routes>
//           <Route path="/" element={<MainPage />} />
//         </Routes>
//         <HatsList hats={props.hats}/>
//       </div>
//     </BrowserRouter>
//   );
// }

function App(props) {
  if (props.hats === undefined) {
    return null;
  }
  return (
    <>
      <Nav />
      <div className="container">
        <HatsList hats={props.hats} />
      </div>
    </>
  );
}

export default App;
