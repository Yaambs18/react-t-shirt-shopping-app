import { useContext } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";

import "./Cart.css"
import CartContext from "../store/cart-context";

const Cart = (props) => {

    const cartCtx = useContext(CartContext);
    const hasCartItems = cartCtx.items.length > 0;

    const cartItems = <ul className="cart-items">
        {cartCtx.items.map(item => {
            return <CartItem
                key={item.id + item.size}
                name={item.name}
                size={item.size}
                price={item.price}
                amount={item.amount}
                onRemove={cartCtx.removeItem.bind(null, item.id, item.size)}
                onAdd={cartCtx.addItem.bind(null, item)}
            />
        })}
    </ul>
    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className="total">
                <span>Total Amount:</span>
                <span>{cartCtx.totalAmount}</span>
            </div>
            <div className="actions">
                <button className="button--alt" onClick={props.onClose}>Close</button>
                {hasCartItems && <button className="button">Order</button>}
            </div>
        </Modal>
    )
}

export default Cart;