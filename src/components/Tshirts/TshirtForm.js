import React, { useState } from "react";

import "./TshirtForm.css";

const TshirtForm = (props) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [sizes, setSizes] = useState([]);
    const [sizeTotalQuantity, setSizeTotalQuantity] = useState({});
    const [price, setPrice] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }
    const handleSizeChange = (event) => {
        const selectedSizes = Array.from(event.target.selectedOptions, option => option.value);
        setSizes(selectedSizes);

        // Initialize or clean up quantities based on selected sizes
        setSizeTotalQuantity(prevQuantities => {
            const newQuantities = {};
            selectedSizes.forEach(size => {
                newQuantities[size] = prevQuantities[size] || '';
            });
            return newQuantities;
        });
    }
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    }

    const handleQuantityChange = (size, value) => {
        setSizeTotalQuantity(prev => ({
            ...prev,
            [size]: value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Convert quantities to numbers
        const formattedQuantities = {};
        for (const size in sizeTotalQuantity) {
            formattedQuantities[size] = Number(sizeTotalQuantity[size]);
        }

        const tshirt = {
            id: Math.random().toString(),
            name,
            description,
            sizes,
            sizeTotalQuantity: formattedQuantities,
            price
        }
        props.onAddTshirt(tshirt);
        props.handleShowForm();
        setName('');
        setDescription('');
        setSizes([]);
        setSizeTotalQuantity({});
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
                <select id="size" name="size" onChange={handleSizeChange} multiple value={sizes}>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
            </div>
            {sizes.length > 0 && (
                <div className="form-control">
                    <label>Quantities per Size:</label>
                    {sizes.map(size => (
                        <div key={size} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <label htmlFor={`qty-${size}`} style={{ width: '50px', marginRight: '10px' }}>{size}:</label>
                            <input
                                type="number"
                                id={`qty-${size}`}
                                placeholder={`Qty for ${size}`}
                                value={sizeTotalQuantity[size] || ''}
                                onChange={(e) => handleQuantityChange(size, e.target.value)}
                                style={{ flex: 1 }}
                            />
                        </div>
                    ))}
                </div>
            )}
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