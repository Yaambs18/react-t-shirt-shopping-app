import React, { useState } from "react";
import Tshirt from "./Tshirt";
import TshirtForm from "./TshirtForm";

import Card from "../UI/Card"

import "./Tshirts.css"

const Tshirts = (props) => {
    const [showForm, setShowForm] = useState(false);
    const [tshirts, setTshirts] = useState([]);

    const handleShowForm = () => {
        setShowForm(!showForm);
    }
    const handleAddTshirt = (tshirt) => {
        console.log(tshirt);
        setTshirts(prevShirts => [...prevShirts, tshirt]);
    }
    return (
        <Card className="tshirts-container">
            {!showForm && <button className="show-form" onClick={handleShowForm}>Show Add T-shirt Form</button>}
            {showForm && <TshirtForm onAddTshirt={handleAddTshirt} handleShowForm={handleShowForm} />}
            <ul className="tshirts">
                {tshirts.map((tshirt, index) => {
                    return <Tshirt
                        key={index}
                        name={tshirt.name}
                        description={tshirt.description}
                        sizes={tshirt.sizes}
                        price={tshirt.price}
                    />
                })}
            </ul>
        </Card>
    )
}

export default Tshirts;