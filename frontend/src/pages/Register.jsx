import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      return alert('Please fill all required fields!');
    }
    setLoading(true);
    try {
      await axios.post('https://mv-water-level-controller-backend.onrender.com/api/auth/register', form);
      alert('Registered successfully!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.12)',
        borderRadius: '24px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>💧</div>
          <h3 style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '0.85rem',
            fontWeight: '400',
            letterSpacing: '0.1em',
            margin: 0
          }}>MV WATER LEVEL CONTROLLER</h3>
        </div>

        <h2 style={{
          color: 'white', textAlign: 'center',
          marginBottom: '6px', fontSize: '1.6rem', fontWeight: '700'
        }}>
          Create Account! 🎉
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.6)', textAlign: 'center',
          marginBottom: '28px', fontSize: '0.9rem'
        }}>
          Join MV Store today
        </p>

        {/* Name */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <span style={{
            position: 'absolute', left: '16px', top: '50%',
            transform: 'translateY(-50%)', fontSize: '1.1rem'
          }}>👤</span>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            style={{...inputStyle, paddingLeft: '44px'}}
          />
        </div>

        {/* Phone */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <span style={{
            position: 'absolute', left: '16px', top: '50%',
            transform: 'translateY(-50%)', fontSize: '1.1rem'
          }}>📱</span>
          <input
            name="phone"
            placeholder="+91 Phone Number"
            onChange={handleChange}
            style={{...inputStyle, paddingLeft: '44px'}}
          />
        </div>

        {/* Email */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <span style={{
            position: 'absolute', left: '16px', top: '50%',
            transform: 'translateY(-50%)', fontSize: '1.1rem'
          }}>📧</span>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            style={{...inputStyle, paddingLeft: '44px'}}
          />
        </div>

        {/* Password */}
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          <span style={{
            position: 'absolute', left: '16px', top: '50%',
            transform: 'translateY(-50%)', fontSize: '1.1rem'
          }}>🔒</span>
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password (min 6 chars)"
            onChange={handleChange}
            style={{...inputStyle, paddingLeft: '44px', paddingRight: '44px'}}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute', right: '16px', top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer', fontSize: '1.1rem'
            }}>
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          disabled={loading}
          style={{
            width: '100%', padding: '14px',
            borderRadius: '25px', border: 'none',
            background: loading
              ? 'rgba(255,255,255,0.2)'
              : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            color: loading ? 'rgba(255,255,255,0.5)' : '#1a1a2e',
            fontSize: '16px', fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}>
          {loading ? '⏳ Creating account...' : '✨ Create Account'}
        </button>

        {/* Divider */}
        <div style={{
          display: 'flex', alignItems: 'center',
          margin: '20px 0', gap: '10px'
        }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.2)' }} />
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
            Or continue with
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.2)' }} />
        </div>

        {/* Social Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
          <button style={socialBtn} onClick={() => alert('Google - Coming Soon!')}>
            <img src="https://www.google.com/favicon.ico" width="20" height="20" alt="G" />
          </button>
          <button style={socialBtn} onClick={() => alert('Facebook - Coming Soon!')}>
            <span style={{ color: '#1877f2', fontWeight: 'bold', fontSize: '1.1rem' }}>f</span>
          </button>
          <button style={socialBtn} onClick={() => alert('Twitter - Coming Soon!')}>
            <span style={{ color: '#1da1f2', fontWeight: 'bold' }}>𝕏</span>
          </button>
        </div>

        <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <Link to="/" style={{ color: '#fbbf24', fontWeight: 'bold' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '13px 16px',
  borderRadius: '25px',
  border: '1px solid rgba(255,255,255,0.2)',
  background: 'rgba(255,255,255,0.1)',
  color: 'white',
  outline: 'none',
  fontSize: '15px',
  boxSizing: 'border-box',
  display: 'block'
};

const socialBtn = {
  width: '48px', height: '48px',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.15)',
  border: '1px solid rgba(255,255,255,0.2)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default Register;
