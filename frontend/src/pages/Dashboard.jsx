import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import productImg from '../assets/img.jpeg';
import wireImg from '../assets/wire.jpg';
import ChatBot from '../components/ChatBot';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/');
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://mv-water-level-controller-backend.onrender.com//api/products');
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setShowCart(true);
    alert(`${product.name} added to cart!`);
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === productId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
  const tax = Number((subtotal * 0.05).toFixed(2));
  const delivery = subtotal > 0 ? 50 : 0;
  const total = Number((subtotal + tax + delivery).toFixed(2));

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
      padding: '20px'
    }}>
      {/* Navbar */}
      <div style={{
        background: 'rgba(0,0,0,0.2)',
        padding: '12px 20px',
        marginBottom: '20px',
        borderRadius: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', margin: 0 }}>
            💧 MV WATER LEVEL CONTROLLER
          </p>
          <h2 style={{ color: 'white', margin: 0, fontSize: '1.2rem' }}>
            Welcome, {JSON.parse(localStorage.getItem('user') || '{}')?.name || 'Guest'} 👋
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={() => setShowCart(true)} style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none', color: 'white',
            padding: '8px 14px', borderRadius: '20px',
            cursor: 'pointer', fontSize: '0.85rem'
          }}>🛒 Cart ({cart.length})</button>
          <button onClick={handleLogout} style={{
            background: 'rgba(239,68,68,0.5)',
            border: 'none', color: 'white',
            padding: '8px 14px', borderRadius: '20px',
            cursor: 'pointer', fontSize: '0.85rem'
          }}>Logout</button>
        </div>
      </div>

      {showCart && (
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto 30px',
          background: 'rgba(255,255,255,0.18)',
          borderRadius: '20px',
          padding: '24px',
          color: 'white',
          backdropFilter: 'blur(12px)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '18px'
          }}>
            <h2 style={{ margin: 0 }}>Cart Summary</h2>
            <button
              onClick={() => setShowCart(false)}
              style={{
                background: 'rgba(255,255,255,0.25)',
                border: 'none',
                color: 'white',
                padding: '8px 14px',
                borderRadius: '16px',
                cursor: 'pointer'
              }}>
              Close
            </button>
          </div>

          {cart.length === 0 ? (
            <p style={{ margin: 0 }}>Your cart is empty. Add a product to see totals.</p>
          ) : (
            <>
              <div style={{ display: 'grid', gap: '14px' }}>
                {cart.map((item) => (
                  <div key={item._id} style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: '14px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    padding: '16px'
                  }}>
                    <div>
                      <h3 style={{ margin: '0 0 8px', fontSize: '1rem' }}>{item.name}</h3>
                      <p style={{ margin: '0 0 6px' }}>Price: ₹{item.price}</p>
                      <p style={{ margin: 0 }}>Qty: {item.quantity}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: '0 0 8px', fontWeight: 'bold' }}>
                        ₹{(Number(item.price) * item.quantity).toFixed(2)}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button
                          onClick={() => updateQuantity(item._id, -1)}
                          style={{
                            background: 'rgba(255,255,255,0.2)',
                            border: 'none',
                            color: 'white',
                            padding: '6px 10px',
                            borderRadius: '12px',
                            cursor: 'pointer'
                          }}>
                          -
                        </button>
                        <button
                          onClick={() => updateQuantity(item._id, 1)}
                          style={{
                            background: 'rgba(255,255,255,0.2)',
                            border: 'none',
                            color: 'white',
                            padding: '6px 10px',
                            borderRadius: '12px',
                            cursor: 'pointer'
                          }}>
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.3)',
                            color: 'white',
                            padding: '6px 10px',
                            borderRadius: '12px',
                            cursor: 'pointer'
                          }}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '24px',
                display: 'grid',
                gap: '10px',
                maxWidth: '380px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Tax (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Delivery Charges</span>
                  <span>₹{delivery.toFixed(2)}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 'bold',
                  borderTop: '1px solid rgba(255,255,255,0.25)',
                  paddingTop: '12px'
                }}>
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => {
                    alert(`Proceeding to pay ₹${total.toFixed(2)}`);
                    navigate('/payment', { state: { amount: total } });
                  }}
                  style={{
                    marginTop: '18px',
                    width: '100%',
                    background: '#22c55e',
                    border: 'none',
                    color: '#1a1a2e',
                    padding: '14px',
                    borderRadius: '18px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                  Pay ₹{total.toFixed(2)}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {products.map((product, index) => {
          const imageSrc = product.image || (index === 3 ? wireImg : productImg);

          return (
          <div key={product._id} style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '16px',
            padding: '20px',
            backdropFilter: 'blur(10px)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '350px'
          }}>
            <img
              src={imageSrc}
              alt={product.name}
              style={{
                width: '100%',
                height: '180px',
                objectFit: 'contain',
                backgroundColor: 'rgba(255,255,255,0.9)',
                borderRadius: '12px',
                padding: '6px',
                marginBottom: '12px',
                display: 'block'
              }}
            />
            <h3 style={{ color: 'white', marginBottom: '8px', fontSize: '0.95rem' }}>
              {product.name}
            </h3>
            <div style={{ marginBottom: '8px' }}>
              {'⭐'.repeat(product.rating)}
            </div>
            <p style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '12px' }}>
              ₹{product.price}
            </p>
            <button
              onClick={() => addToCart(product)}
              style={{
                background: '#1a1a2e',
                color: 'white',
                border: 'none',
                padding: '10px 24px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: 'bold',
                width: '100%'
              }}>
              Add to Cart
            </button>
          </div>
          );
        })}
      </div>
      <ChatBot />
    </div>
  );
}

export default Dashboard;