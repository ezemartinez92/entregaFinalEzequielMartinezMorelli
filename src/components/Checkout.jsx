import { useState } from 'react';
import { db } from '../utils/firebase'; // Asegúrate que la ruta sea correcta
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Checkout = ({ cart, totalPrice, clearCart }) => {
    const [userData, setUserData] = useState({
        nombre: '',
        telefono: '',
        email: ''
    });
    //
    const [orderId, setOrderId] = useState(null);

    // Capturamos lo que el usuario escribe
    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Armamos el objeto de la orden
        const order = {
            buyer: userData,
            items: cart.map(item => ({
                id: item.id,
                nombre: item.nombre,
                precio: item.precio,
                cantidad: item.cantidad
            })),
            total: totalPrice,
            date: serverTimestamp()
        };

        try {
            const docRef = await addDoc(collection(db, "orders"), order);
            setOrderId(docRef.id); // Guardamos el ID de Firebase
            clearCart(); // Vaciamos el carrito de la App
        } catch (error) {
            console.error("Error al crear la orden: ", error);
        }
    };

    // Si ya hay ID, mostramos pantalla de éxito
    if (orderId) {
        return (
            <div className="detail-container" style={{flexDirection: 'column', textAlign: 'center', padding: '60px'}}>
                <h2 style={{color: 'var(--accent-red)'}}>¡Compra Exitosa!</h2>
                <p style={{margin: '20px 0'}}>Gracias por confiar en <strong>Zapatos Premium</strong>.</p>
                <p>Tu código de seguimiento es:</p>
                <h3 style={{background: '#eee', padding: '10px', borderRadius: '6px', marginTop: '10px'}}>
                    {orderId}
                </h3>
            </div>
        );
    }

    return (
        <div className="detail-container" style={{flexDirection: 'column', maxWidth: '600px', margin: '40px auto'}}>
            <h2 style={{marginBottom: '20px'}}>Finalizar Pedido</h2>
            
            <form 
                className="purchase-section" 
                onSubmit={handleSubmit}
                style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '15px'}}
            >
                <input 
                    type="text" 
                    name="nombre"
                    placeholder="Nombre completo" 
                    className="qty-number" 
                    style={{width: '100%', textAlign: 'left', padding: '12px'}} 
                    onChange={handleInputChange}
                    required
                />
                <input 
                    type="email" 
                    name="email"
                    placeholder="Email" 
                    className="qty-number" 
                    style={{width: '100%', textAlign: 'left', padding: '12px'}} 
                    onChange={handleInputChange}
                    required
                />
                <input 
                    type="tel" 
                    name="telefono"
                    placeholder="Teléfono" 
                    className="qty-number" 
                    style={{width: '100%', textAlign: 'left', padding: '12px'}} 
                    onChange={handleInputChange}
                    required
                />
                
                <div style={{marginTop: '10px', borderTop: '1px solid #eee', paddingTop: '10px'}}>
                    <p style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '15px'}}>
                        Total a pagar: ${totalPrice.toLocaleString()}
                    </p>
                    <button className="btn-add-to-cart" type="submit">
                        Confirmar y Generar Orden
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Checkout;