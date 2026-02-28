import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProducts, getProductsByCategory } from '../data/asincronismo';

// Componente presentacional interno para la tarjeta (puedes moverlo a Item.jsx)
const Item = ({ id, nombre, img, precio }) => {
    return (
        <article className="card">
            <img src={img} alt={nombre} />
            <h3>{nombre}</h3>
            <p>${precio}</p>
            {/* Link para navegar al detalle */}
            <Link to={`/item/${id}`} className="btn-primary" style={{display:'inline-block', marginTop:'10px', textDecoration:'none'}}>
                Ver Detalle
            </Link>
        </article>
    );
};

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);

        const asyncFunc = categoryId ? getProductsByCategory : getProducts;

        asyncFunc(categoryId)
            .then(response => {
                setProducts(response);
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false));

    }, [categoryId]); 

    return (
        <div className="container">
            <h1>{greeting} {categoryId && ` - ${categoryId}`}</h1>
            {loading ? (
                <h2>Cargando productos...</h2>
            ) : (
                <div className="grid">
                    {products.map(prod => (
                        <Item key={prod.id} {...prod} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ItemListContainer;