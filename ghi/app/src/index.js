import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// async function loadHats(){
//   const response = await fetch('http://localhost:8090/api/hats/');
//   if (response.ok) {
//     const data = await response.json();
//     console.log(data);
//     root.render(
//       <React.StrictMode>
//         <App hats={data.hats} />
//       </React.StrictMode>
//     );
//   }else {
//     console.error(response);
//     }
//   }

//   loadHats()

// async function loadHatsAndShoes() {
//   const response = await fetch('http://localhost:8090/api/hats/');
//   const shoeResponse = await fetch('http://localhost:8080/api/shoes/');
//   if (response.ok && shoeResponse.ok) {
//     const data = await response.json();
//     const shoeData = await shoeResponse.json();
//     console.log(shoeData)
//     root.render(
//       <React.StrictMode>
//         <App hats={data.hats} shoes={shoeData} />
//       </React.StrictMode>
//     )
//   }else{
//     console.error(response | shoeResponse)
//   }
// }
//   loadHatsAndShoes()