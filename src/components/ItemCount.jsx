import React, { useState } from 'react';

const ItemCount = ({ stock, initial, onAdd }) => {
    const [quantity, setQuantity] = useState(initial);

    const increment = () => {
        if (quantity < stock) setQuantity(quantity + 1);
    };

    const decrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    return (
        <div className="item-count-wrapper">
            <div className="qty-selector">
                <button className="qty-btn" onClick={decrement}>-</button>
                <span className="qty-number">{quantity}</span>
                <button className="qty-btn" onClick={increment}>+</button>
            </div>

            <button 
                className="btn-add-to-cart" 
                onClick={() => onAdd(quantity)}
                disabled={!stock}
            >
                Agregar al Carrito
            </button>
        </div>
    );
};

export default ItemCount;