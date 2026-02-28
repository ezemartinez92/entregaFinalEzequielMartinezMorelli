import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer.jsx";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import './App.css';
import "./styles.css";
import { db } from './utils/firebase.js';
import { zapatos } from "./data/zapatos.js"; 
import { collection, addDoc } from "firebase/firestore";

function App() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const cargarDatos = async () => {
      await subirCatalogo(); 
    };
    cargarDatos();
  }, []);


/*Este código es para subir el catálogo a Firestore, solo se ejecuta una vez al iniciar la app. 
/*
  const subirCatalogo = async () => {
    const zapatosCollection = collection(db, "zapatos");
    for (const zapato of zapatos) {
      try {
        await addDoc(zapatosCollection, zapato);
        console.log(`✅ Producto subido: ${zapato.nombre}`);
      } catch (error) {
        console.error("❌ Error al subir: ", error);
      }
    }
   // alert("¡Catálogo subido con éxito!");
  };*/

  
  const addToCart = (producto) => {
    setCart((prevCart) => {
      const existe = prevCart.find((item) => item.id === producto.id);
      if (existe) {
        return prevCart.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + producto.cantidad }
            : item
        );
      }
      return [...prevCart, producto];
    });
  };

  const increaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <BrowserRouter>
      <NavBar cartCount={totalItems} />
      <div className="main-layout">
        <Routes>
          <Route path="/" element={<ItemListContainer greeting="Todos nuestros productos" />} />
          <Route path="/category/:categoryId" element={<ItemListContainer greeting="Categoría seleccionada" />} />
          <Route path="/item/:itemId" element={<ItemDetailContainer addToCart={addToCart} />} />
          <Route path="/cart" element={
            <div className="cart-page-container" style={{width: '100%'}}>
              <h2>Tu Carrito de Compras</h2>
              <Cart cart={cart} increaseQty={increaseQty} decreaseQty={decreaseQty} totalPrice={totalPrice} clearCart={clearCart}/>
            </div>
          } />
          <Route path="/checkout" element={<Checkout cart={cart} totalPrice={totalPrice} clearCart={clearCart} />} />
          <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;