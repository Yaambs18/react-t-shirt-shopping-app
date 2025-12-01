import React, { useState } from "react";
import Tshirt from "./Tshirt";
import TshirtForm from "./TshirtForm";

import Card from "../UI/Card"

import "./Tshirts.css"
import AIStockAnalysis from "./AIStockAnalysis";

const dummyTshirts = [
    {
        id: 't1',
        name: 'T-shirt 1',
        description: 'Description 1',
        sizes: ['S', 'M', 'L', 'XL'],
        sizeTotalQuantity: { S: 10, M: 5, L: 2, XL: 1 },
        price: 100
    },
    {
        id: 't2',
        name: 'T-shirt 2',
        description: 'Description 2',
        sizes: ['S', 'M', 'L', 'XL'],
        sizeTotalQuantity: { S: 10, M: 20, L: 15, XL: 3 },
        price: 200
    },
    {
        id: 't3',
        name: 'T-shirt 3',
        description: 'Description 3',
        sizes: ['S', 'M', 'L', 'XL'],
        sizeTotalQuantity: { S: 10, M: 10, L: 10, XL: 10 },
        price: 300
    }
];

const Tshirts = (props) => {
    const [showForm, setShowForm] = useState(false);
    const [tshirts, setTshirts] = useState(dummyTshirts);
    const [isAiAnalysisModalOpen, setAiAnalysisModalOpen] = useState(false);

    const modalCloseHandler = () => {
        setAiAnalysisModalOpen(!isAiAnalysisModalOpen);
    }

    const handleShowForm = () => {
        setShowForm(!showForm);
    }
    const handleAddTshirt = (tshirt) => {
        // console.log(tshirt);
        setTshirts(prevShirts => [...prevShirts, tshirt]);
    }

    const updateTshirtQuantity = (id, size, quantity) => {
        setTshirts(prevShirts => {
            return prevShirts.map(tshirt => {
                if (tshirt.id === id) {
                    return { ...tshirt, sizeTotalQuantity: { ...tshirt.sizeTotalQuantity, [size]: quantity } }
                }
                return tshirt;
            })
        });
    }

    return (
        <Card className="tshirts-container">
            {!showForm && <button className="show-form" onClick={handleShowForm}>Show Add T-shirt Form</button>}
            {showForm && <TshirtForm onAddTshirt={handleAddTshirt} handleShowForm={handleShowForm} />}
            <ul className="tshirts">
                {isAiAnalysisModalOpen && <AIStockAnalysis onClose={modalCloseHandler} tshirts={tshirts}/>}
                <button className="ai-analyze-stock-btn" onClick={modalCloseHandler}>Analyze Stock (AI)</button>
                {tshirts.map((tshirt, index) => {
                    return <Tshirt
                        key={index}
                        id={tshirt.id}
                        name={tshirt.name}
                        description={tshirt.description}
                        sizes={tshirt.sizes}
                        sizeTotalQuantity={tshirt.sizeTotalQuantity}
                        price={tshirt.price}
                        onUpdateQuantity={updateTshirtQuantity}
                    />
                })}
            </ul>
        </Card>
    )
}

export default Tshirts;