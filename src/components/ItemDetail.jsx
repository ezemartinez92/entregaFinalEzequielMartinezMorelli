import React, { useState } from 'react';
import ItemCount from './ItemCount';
import { Link } from 'react-router-dom';

const ItemDetail = ({ id, nombre, precio, category, img, description, stock, addToCart }) => {
    const [quantityAdded, setQuantityAdded] = useState(0);

    const handleOnAdd = (quantity) => {
        setQuantityAdded(quantity);
    
        const item = {
            id, nombre, precio, img
        };
        addToCart({ ...item, cantidad: quantity }); 
    };

    return (
        <div className="detail-container">
            <div className="detail-image-box">
                <img src={img} alt={nombre} />
            </div>
            
            <div className="detail-info-box">
                <span className="category-badge">{category}</span>
                <h2>{nombre}</h2>
                <p className="price">${precio.toLocaleString()}</p>
                <p className="description">{description || "Calzado premium diseñado para ofrecer la máxima comodidad y estilo en cada paso."}</p>
                
                <div className="purchase-section">
                    {quantityAdded > 0 ? (
                     
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                            
                            
                            <Link to="/cart" className="btn-finish">
                                Terminar compra
                            </Link>

                          
                            <Link to="/" className="btn-primary">
                                Seguir comprando
                            </Link>
                            
                        </div>
                    ) : (
                        <ItemCount initial={1} stock={stock || 10} onAdd={handleOnAdd} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;