import React, {useEffect, useState } from 'react';


function HatForm() {

    const [locations, setLocations] = useState([]);
    const [styleName, setStyleName] = useState('')
    const [fabric, setFabric] = useState('')
    const [color, setColor] = useState('')
    const [hatPictureUrl, setHatPictureUrl] = useState('')
    const [location, setLocation] = useState('')

    const fetchData = async () => {
        const url = 'http://localhost:8090/api/locations/';
        const response = await fetch(url);
        if (response.ok) {
        const data = await response.json();
        setLocations(data.locations);
        }
    }

    useEffect(() =>{
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.location = location;
        data.style_name = styleName;
        data.fabric = fabric;
        data.color = color;
        data.hat_picture_url= hatPictureUrl
        console.log(data)


        const hatUrl = 'http://localhost:8090/api/hats/';
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
             'Content-Type': 'application/json',
           },
        };

         const hatResponse = await fetch(hatUrl, fetchOptions);
         if (hatResponse.ok) {
            console.log(hatResponse);
            setLocation('');
            setStyleName('');
            setFabric('');
            setColor('');
            setHatPictureUrl('');
         }
      }
    const handleStyleNameChange = (event) => {
        const value = event.target.value;
        setStyleName(value);
    }

    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    }

    const handleFabricChange = (event) => {
        const value = event.target.value;
        setFabric(value);
    }

    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const handleHatPictureUrlChange = (event) => {
        const value = event.target.value;
        setHatPictureUrl(value);
    }


    return (
        <div className="my-5 container">
        <div className="row">
          <div className="col">
            <div className="card shadow">
              <div className="card-body">
                <form onSubmit={handleSubmit} id="create-hat-form">
                  <h1 className="card-title">Add a hat</h1>
                  <p className="mb-3">
                    Please choose which closet
                  </p>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={handleStyleNameChange} required placeholder="Style name" type="text" id="style_name" name="style_name" className="form-control" value={styleName}/>
                        <label htmlFor="style_name">Style Name</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={handleFabricChange} required placeholder="Fabric" type="text" id="fabric" name="fabric" className="form-control" value={fabric} />
                        <label htmlFor="fabric">Fabric</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={handleColorChange} required placeholder="Color" type="text" id="color" name="color" className="form-control" value={color}/>
                        <label htmlFor="color">Color</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input onChange={handleHatPictureUrlChange} required placeholder="Hat picture url" type="text" id="hat_picture_url" name="hat_picture_url" className="form-control" value={hatPictureUrl}/>
                        <label htmlFor="hat_picture_url">Hat Picture Url</label>
                      </div>
                    </div>
                    <div className="form-floating mb-3">
                    <select onChange={handleLocationChange} name="location" id="location" required>
                      <option value="">Choose a closet</option>
                      {locations.map(location => {
                        return (
                          <option key={location.import_href} value={location.import_href}>{location.closet_name}</option>
                        )
                      })}
                    </select>
                  </div>
                  <button className="btn btn-lg btn-primary">Add!</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default HatForm;
