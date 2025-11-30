import "./CartItem.css";

const CartItem = (props) => {
    return (
        <li className="cart-item">
            <div>
                <h2>{props.name}({props.size})</h2>
                <div className="summary">
                    <span className="price">Rs {props.price}</span>
                    <span className="quantity">x{props.amount}</span>
                </div>
            </div>
            <div className="cart-items-actions">
                <button onClick={props.onAdd}>+</button>
                <button onClick={props.onRemove}>-</button>
            </div>
        </li>
    )
}

export default CartItem;