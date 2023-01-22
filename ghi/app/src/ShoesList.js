import React, { useState, useEffect } from 'react';

function ShoesList({ shoes, getShoes }){
  const deleteShoe = async (id) => {
    const response = await fetch(`http://localhost:8080/api/shoes/${id}/`, {
      method: "delete",
    })
  if (response.ok) {
    return getShoes()
  }
  }
  if (shoes === undefined) {
     return null
  }

  return (
    <>
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
          {shoes.map((shoes) => {
            return (
              <tr key={shoes.id}>
                <td>{ shoes.model_name }</td>
                <td>{ shoes.manufacturer }</td>
                <td>{ shoes.color }</td>
                <td><img src={shoes.pic_url} className="img-thumbnail" width="150" height="150"></img></td>
                <td>{shoes.bin}</td>
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