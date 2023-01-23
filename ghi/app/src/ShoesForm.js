import React, { useEffect, useState } from 'react';

function ShoesForm({getShoes}) {

    const [model_name, setModel_name] = useState('');

    const handleModel_nameChange = (event) => {
        const value = event.target.value;
        setModel_name(value);
      }

      const [manufacturer, setManufacturer] = useState('');

      const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
      }

      const [color, setColor] = useState('');

      const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
      }

      const [pic_url, setPic_url] = useState('');

      const handlePic_urlChange = (event) => {
        const value = event.target.value;
        setPic_url(value);
      }

      const [bin, setBin] = useState('');

      const handleBinChange = (event) => {
        const value = event.target.value;
        setBin(value);
      }

      const handleSubmit = async (event) => {
        event.preventDefault();
      
        const data = {};
        data.model_name = model_name;
        data.manufacturer = manufacturer;
        data.color = color;
        data.pic_url = pic_url;
        data.bin = bin;
      
      
        const shoesUrl = 'http://localhost:8080/api/shoes/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
      
        const response = await fetch(shoesUrl, fetchConfig);
        if (response.ok) {
          const newBin = await response.json();
          setModel_name('');
          setManufacturer('');
          setColor('');
          setPic_url('');
          setBin('');
          getShoes();        
        }
      }

    const [bins, setBins] = useState([]);
    const fetchData = async () => {
        const url = 'http://localhost:8080/api/binVOs/'

        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            console.log(data.bins)
            setBins(data.bins)

            }
        }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new shoe</h1>
            <form onSubmit={handleSubmit} id="create-shoe-form">
              <div className="form-floating mb-3">                
                <input onChange={handleModel_nameChange} placeholder="Model" required type="text" name="model_name" id="model_name" className="form-control" value={model_name} />
                <label htmlFor="name">Model</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleManufacturerChange} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control" value={manufacturer} />
                <label htmlFor="room_count">Manufacturer</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleColorChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" value={color} />
                <label htmlFor="city">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handlePic_urlChange} placeholder="Picture URL" type="text" name="pic_url" id="pic_url" className="form-control" value={pic_url} />
                <label htmlFor="city">Picture URL</label>
              </div>
              <div className="mb-3">
                <select onChange={handleBinChange} required  name="bin" id="bin" className="form-select" value={bin}>
                  <option>Bin</option>
                  {bins.map(bin => {
                    return (
                        <option key={bin.id} value={bin.id}>
                            {bin.id}
                        </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create shoe</button>
            </form>
          </div>
        </div>
      </div>
    )
}
export default ShoesForm;
