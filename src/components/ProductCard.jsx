const ProductCard = ({ producto, addToCart }) => {
    return (
      <div className="card">
        <img src={producto.img} alt={producto.nombre} />
        <h3>{producto.nombre}</h3>
        <p>${producto.precio}</p>
        <button onClick={() => addToCart(producto)}>
          Agregar al carrito
        </button>
      </div>
    );
  };

  export default ProductCard;