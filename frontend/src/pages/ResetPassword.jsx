import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, otp } = location.state || {};

  const handleReset = async () => {
    if (!newPassword) return alert('Enter new password!');
    if (newPassword !== confirmPassword) return alert('Passwords do not match!');
    setLoading(true);
    try {
      await axios.post('https://your-railway-backend-url.railway.app/api/forgot/reset-password', {
        email, otp, newPassword
      });
      alert('Password reset successfully!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Error resetting password!');
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
        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '24px' }}>
          New Password
        </h2>

        <input
          type="password"
          placeholder="At least 6 digits"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleReset} disabled={loading} style={btnStyle}>
          {loading ? 'Updating...' : 'Update Password'}
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

export default ResetPassword;