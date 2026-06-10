import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Admin() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '', price: '', description: '', stock: '', rating: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get('https://mv-water-level-controller-backend.onrender.com/api/products');
    setProducts(res.data);
  };

  const handleAdd = async () => {
    try {
      await axios.post('https://mv-water-level-controller-backend.onrender.com/api/products', newProduct);
      alert('Product added!');
      fetchProducts();
      setNewProduct({ name: '', price: '', description: '', stock: '', rating: '' });
    } catch (err) {
      alert('Error adding product!');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      await axios.delete(`https://mv-water-level-controller-backend.onrender.com/api/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
      padding: '30px',
      color: 'white'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2rem' }}>🛠️ Admin Panel</h1>
          <button onClick={() => navigate('/dashboard')} style={{
            background: '#7c3aed', border: 'none', color: 'white',
            padding: '10px 20px', borderRadius: '20px', cursor: 'pointer'
          }}>← Back to Store</button>
        </div>

        {/* Add Product Form */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '16px', padding: '24px', marginBottom: '30px'
        }}>
          <h2 style={{ marginBottom: '16px' }}>➕ Add New Product</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {['name', 'price', 'description', 'stock', 'rating'].map(field => (
              <input
                key={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={newProduct[field]}
                onChange={e => setNewProduct({ ...newProduct, [field]: e.target.value })}
                style={{
                  padding: '12px', borderRadius: '10px',
                  border: '1px solid #333', background: '#2d2d44',
                  color: 'white', outline: 'none'
                }}
              />
            ))}
          </div>
          <button onClick={handleAdd} style={{
            marginTop: '16px', background: '#10b981',
            border: 'none', color: 'white', padding: '12px 30px',
            borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold'
          }}>Add Product</button>
        </div>

        {/* Products List */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '16px', padding: '24px'
        }}>
          <h2 style={{ marginBottom: '16px' }}>📦 All Products</h2>
          {products.map(p => (
            <div key={p._id} style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', padding: '16px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '10px', marginBottom: '10px'
            }}>
              <div>
                <p style={{ fontWeight: 'bold' }}>{p.name}</p>
                <p style={{ color: '#a78bfa' }}>₹{p.price} | Stock: {p.stock}</p>
              </div>
              <button onClick={() => handleDelete(p._id)} style={{
                background: '#ef4444', border: 'none',
                color: 'white', padding: '8px 16px',
                borderRadius: '10px', cursor: 'pointer'
              }}>🗑️ Delete</button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Admin;