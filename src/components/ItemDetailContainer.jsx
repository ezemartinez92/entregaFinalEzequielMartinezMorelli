
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../data/asincronismo'; 
import ItemDetail from './ItemDetail';

const ItemDetailContainer = ({ addToCart }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Captura el :itemId de la URL
    const { itemId } = useParams();

    useEffect(() => {
        setLoading(true);
        
        getProductById(itemId)
            .then(response => {
                setProduct(response);
            })
            .catch(error => {
                console.error("Error al cargar producto:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [itemId]);


    // Retornos condicionales
    if (loading) {
        return <div className="container"><h2>Cargando detalle...</h2></div>;
    }

    if (!product) {
        return <div className="container"><h2>Producto no encontrado</h2></div>;
    }

    return (
        <div className="container">
            <ItemDetail {...product} addToCart={addToCart} />
        </div>
    );
};

export default ItemDetailContainer;