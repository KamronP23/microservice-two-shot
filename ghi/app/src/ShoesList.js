import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ShoesList(props){
  const deleteShoe = async (id) => {
    const response = await fetch(`http://localhost:8080/api/shoes/${id}/`, {
      method: "delete",
    })
  if (response.ok) {
    //getShoes()
  }
  }
  // // if (shoes === undefined) {
  //   return null
  // }

  return (
    <>
      <Link to={"/shoes/new"}>Create new shoe</Link>
      <table className="table table-striped align-middle mt-5">
        <thead>
          <tr>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Color</th>
            <th>Picture</th>
            <th>Bin</th>
            <th>Delete</th>

          </tr>
        </thead>
        <tbody>
          {props.shoes.map(shoes => {
            return (
              <tr key={shoes.bin}>
                <td>{ shoes.model_name }</td>
                <td>{ shoes.manufacturer }</td>
                <td>{ shoes.color }</td>
                <td><img src={shoes.pic_url} className="img-thumbnail"></img></td>
                <td>{shoes.bin}</td>
                {/* <td>{shoes.closet_name.bin_number}</td> */}
                <td>
                  <button type="button" value={shoes.id} onClick={() => deleteShoe(shoes.id)}>Delete</button> 
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
    </>
    );
}

export default ShoesList;