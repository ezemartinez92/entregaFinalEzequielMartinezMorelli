import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

const CartItem = ({ item, onIncrease, onDecrease }) => (
  <div className="cart-item-card">
    <div className="cart-img-wrapper">
      <img src={item.img} alt={item.nombre} loading="lazy" />
    </div>

    <div className="cart-item-info">
      <h4>{item.nombre}</h4>
      <p className="unit-price">Precio unitario: ${item.precio.toLocaleString()}</p>
      
      <div className="item-count-wrapper">
        <div className="qty-selector">
          <button 
            className="qty-btn" 
            onClick={() => onDecrease(item.id)}
            aria-label="Disminuir"
          >-</button>
          
          <span className="qty-number">{item.cantidad}</span>
          
          <button 
            className="qty-btn" 
            onClick={() => onIncrease(item.id)}
            aria-label="Aumentar"
          >+</button>
        </div>
      </div>
    </div>

    <div className="cart-item-subtotal">
      <p>Subtotal</p>
      <strong>${(item.precio * item.cantidad).toLocaleString()}</strong>
    </div>
  </div>
);

const Cart = ({ cart = [], increaseQty, decreaseQty, totalPrice, clearCart }) => {
  const totalItems = useMemo(() => 
    cart.reduce((acc, item) => acc + item.cantidad, 0), 
    [cart]
  );

  if (cart.length === 0) {
    return (
      <div className="cart-empty-container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>Tu carrito está vacío</h2>
        <p>¿No sabes qué elegir? ¡Mira nuestras nuevas colecciones!</p>
        <Link to="/" className="btn-primary" style={{ marginTop: '20px', width: 'auto' }}>
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <section className="cart-items-list" aria-label="Productos en el carrito">
        {cart.map((item) => (
          <CartItem 
            key={item.id} 
            item={item} 
            onIncrease={increaseQty} 
            onDecrease={decreaseQty} 
          />
        ))}

        {/* Botón vaciar carrito */}
        <div style={{ textAlign: 'right', marginTop: '20px' }}>
          <button 
            onClick={() => window.confirm("¿Vaciar todo el carrito?") && clearCart()}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-red)',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}
          >
            Vaciar Carrito
          </button>
        </div>
      </section>

      <aside className="cart-summary">
        <h3>Resumen de Compra</h3>
        <div className="summary-details">
          <div className="summary-row">
            <span>Productos ({totalItems})</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <strong>${totalPrice.toLocaleString()}</strong>
          </div>
        </div>
        
        <Link to="/checkout" className="btn-checkout">
          Finalizar Compra
        </Link>
      </aside>
    </div>
  );
};

export default Cart;