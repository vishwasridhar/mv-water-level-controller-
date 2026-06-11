import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleVerify = async () => {
    if (!otp) return alert('Enter OTP!');
    setLoading(true);
    try {
      await axios.post('https://your-railway-backend-url.railway.app/api/forgot/verify-otp', { email, otp });
      alert('OTP verified!');
      navigate('/reset-password', { state: { email, otp } });
    } catch (err) {
      alert(err.response?.data?.message || 'Invalid OTP!');
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
          Verification
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: '24px', fontSize: '0.9rem' }}>
          Enter the OTP sent to {email}
        </p>

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          maxLength={6}
          style={inputStyle}
        />

        <button onClick={handleVerify} disabled={loading} style={btnStyle}>
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
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

export default VerifyOTP;