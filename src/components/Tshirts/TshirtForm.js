import React, { useState } from "react";

import "./TshirtForm.css";

const TshirtForm = (props) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [sizes, setSizes] = useState([]);
    const [price, setPrice] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }
    const handleSizeChange = (event) => {
        setSizes(event.target.value.split(',').map(s => s.trim()).filter(s => s !== ''));
    }
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const tshirt = {
            name,
            description,
            sizes,
            price
        }
        props.onAddTshirt(tshirt);
        props.handleShowForm();
        setName('');
        setDescription('');
        setSizes([]);
        setPrice('');
    }

    return (
        <form className="tshirt-form">
            <div className="form-control">
                <label htmlFor="name"> Name: </label>
                <input type="text" id="name" name="name" placeholder="Enter T-shirt name" value={name} onChange={handleNameChange} />
            </div>
            <div className="form-control">
                <label htmlFor="description"> Description: </label>
                <input type="text" id="description" name="description" placeholder="Enter T-shirt description" value={description} onChange={handleDescriptionChange} />
            </div>
            <div className="form-control">
                <label htmlFor="size"> Size: </label>
                <select id="size" name="size" onChange={handleSizeChange} multiple>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
            </div>
            <div className="form-control">
                <label htmlFor="price"> Price: </label>
                <input type="text" id="price" name="price" placeholder="Enter T-shirt price" value={price} onChange={handlePriceChange} />
            </div>
            <div className="actions">
                <button className="add-tshirt-btn" type="submit" onClick={handleSubmit}>Add T-shirt</button>
                <button className="cancel-btn" type="button" onClick={props.handleShowForm}>Cancel</button>
            </div>
        </form>
    )
}

export default TshirtForm;