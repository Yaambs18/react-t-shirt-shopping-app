import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    console.log(action);
    if (action.type === "ADD") {
        const updatedTotalAmount = +state.totalAmount + +action.item.price;
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.item.id && item.size === action.item.size
        );
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + 1
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    else if (action.type === "REMOVE") {
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.id && item.size === action.size
        );
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = +state.totalAmount - +existingCartItem.price;
        let updatedItems;
        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id || item.size !== action.size);
        } else {
            const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    } else if (action.type === "CLEAR") {
        return defaultCartState;
    }
    return state;

}

const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemtoCartHandler = (item) => {
        dispatchCartAction({ type: "ADD", item: item });
    }

    const removeItemfromCartHandler = (id, size) => {
        dispatchCartAction({ type: "REMOVE", id: id, size: size });
    }

    const clearCartHandler = () => {
        dispatchCartAction({ type: "CLEAR" });
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemtoCartHandler,
        removeItem: removeItemfromCartHandler,
        clearCart: clearCartHandler
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;