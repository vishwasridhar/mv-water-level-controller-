import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (!email) return alert('Enter your email!');
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/forgot/send-otp', { email });
      alert('OTP sent to your email!');
      navigate('/verify-otp', { state: { email } });
    } catch (err) {
      alert(err.response?.data?.message || 'Error sending OTP!');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ef4444, #f97316)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.15)',
        borderRadius: '20px',
        padding: '40px',
        width: '350px',
        backdropFilter: 'blur(10px)'
      }}>
        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '8px' }}>
          Forgot Password
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: '24px', fontSize: '0.9rem' }}>
          Enter your email to receive OTP
        </p>

        <input
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleSendOTP} disabled={loading} style={btnStyle}>
          {loading ? 'Sending...' : 'Send OTP'}
        </button>

        <p style={{ color: 'white', textAlign: 'center', marginTop: '16px' }}>
          <Link to="/" style={{ color: '#fbbf24' }}>Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '12px 16px',
  borderRadius: '25px', border: 'none',
  marginBottom: '16px', background: 'rgba(255,255,255,0.2)',
  color: 'white', outline: 'none', fontSize: '15px',
  boxSizing: 'border-box', display: 'block'
};

const btnStyle = {
  width: '100%', padding: '12px',
  borderRadius: '25px', border: 'none',
  background: 'rgba(255,255,255,0.3)',
  color: 'white', fontSize: '16px',
  cursor: 'pointer', marginTop: '8px'
};

export default ForgotPassword;