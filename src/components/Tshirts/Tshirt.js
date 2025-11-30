import { useContext, useState } from "react";
import "./Tshirt.css"
import CartContext from "../store/cart-context";

const Tshirt = (props) => {
    const cartCtx = useContext(CartContext);

    const [selectedSize, setSelectedSize] = useState(props.sizes[0]);

    const sizeChangeHandler = (event) => {
        setSelectedSize(event.target.value);
    }

    const addToCartHandler = () => {
        const tempItem = { ...props, amount: 1, size: selectedSize }
        cartCtx.addItem(tempItem);
        props.onUpdateQuantity(props.id, selectedSize, props.sizeTotalQuantity[selectedSize] - 1);
    }
    return (
        <li className="tshirt">
            <span className="name">{props.name}</span>
            <p className="description">{props.description}</p>
            <select className="size" value={selectedSize} onChange={sizeChangeHandler}>
                {props.sizes.map(
                    size => <option key={size}>{size}</option>
                )}
            </select>
            <span className="size-quantity">{props.sizeTotalQuantity[selectedSize]}</span>
            <span className="price">Rs.{props.price}</span>
            <button className="add-to-cart" onClick={addToCartHandler}>Add to Cart</button>
        </li>
    )
}

export default Tshirt;
