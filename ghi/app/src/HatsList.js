import React, {useState, useEffect} from 'react';
// import loadHats from "./index.js"
import { Link } from 'react-router-dom';

function HatsList ({ hats, loadHats }){
    const deleteHat = async (id) => {
        console.log(loadHats)
        const response = await fetch (`http://localhost:8090/api/hats/${id}`, {
            method: "delete",
        })
        .then(() => {
            return loadHats()
        })
        .catch(console.log)
    }
    if (hats === undefined) {
        return null
    }

    return (
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Fabric</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          {hats.map(hat => {
            return (
              <tr key={hat.id}>
                <td>{ hat.style_name }</td>
                <td>{ hat.location }</td>
                <td>{ hat.fabric }</td>
                <td>{ hat.color }</td>
                <td><img src={hat.hat_picture_url} className="img-thumbnail"></img> </td>
                <td>
                    <button type="button" value={hat.id} onClick={() => deleteHat(hat.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
}

export default HatsList;