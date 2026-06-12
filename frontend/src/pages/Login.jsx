import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) return alert('Please fill all fields!');
        setLoading(true);
        try {
            const res = await axios.post('https://mv-water-level-controller-backend.onrender.com/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/dashboard');
        }
        catch (err) {
    console.log("LOGIN ERROR:", err);
    console.log("RESPONSE:", err.response?.data);

    alert(
        err.response?.data?.message ||
        err.message ||
        "Login failed"
    );
}
        setLoading(false);
    };
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        }}>
            <div style={{
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '20px',
                padding: '40px',
                width: '350px',
                maxWidth: '400px',
                backdropFilter: 'blur(10px)',
            }}>
                <div style={{ textAlign: 'center', marginBottom: '14px' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>💧</div>
                    <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '8px' }}>Welcome Back!</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0 }}>Sign in to your account</p>
                </div>

                <div style={{ position: 'relative', marginBottom: '16px' }}>
                    <span style={{
                        position: 'absolute', left: '14px', top: '50%',
                        transform: 'translateY(-50%)', fontSize: '1rem'
                    }}>📧</span>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                        style={{ ...inputStyle, paddingLeft: '44px' }}
                    />
                </div>
                <div style={{ position: 'relative', marginBottom: '16px' }}>
                    <span style={{
                        position: 'absolute', left: '14px', top: '50%',
                        transform: 'translateY(-50%)', fontSize: '1rem'
                    }}>🔒</span>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                        style={{ ...inputStyle, paddingLeft: '44px', paddingRight: '44px' }}
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute', right: '14px', top: '50%',
                            transform: 'translateY(-50%)', cursor: 'pointer', fontSize: '1rem'
                        }}
                    >
                        {showPassword ? '🙈' : '👁️'}
                    </span>
                </div>

                <button onClick={handleLogin} disabled={loading} style={{
                    ...btnStyle,
                    background: loading ? 'rgba(255,255,255,0.25)' : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    color: loading ? 'rgba(255,255,255,0.7)' : '#1a1a2e'
                }}>
                    {loading ? '⏳ Signing in...' : '🚀 Sign In'}
                </button>

                <p style={{ color: 'white', textAlign: 'center', marginTop: '12px' }}>
                    <Link to="/forgot-password" style={{ color: '#fbbf24' }}>Forgot password?</Link>
                </p>
                <p style={{ color: 'white', textAlign: 'center', marginTop: '16px' }}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: '#fbbf24', textDecoration: 'none' }}>Sign up</Link>
                </p>
                {/* Divider */}
<div style={{
  display: 'flex', alignItems: 'center',
  margin: '20px 0', gap: '10px'
}}>
  <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.3)' }} />
  <span style={{ color: 'white', fontSize: '0.85rem' }}>Or continue with</span>
  <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.3)' }} />
</div>

{/* Social Buttons */}
<div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
  <button style={socialBtn} onClick={() => alert('Google login coming soon!')}>
    <img src="https://www.google.com/favicon.ico" width="20" height="20" alt="G" />
  </button>
  <button style={socialBtn} onClick={() => alert('Facebook login coming soon!')}>
    <span style={{ color: '#1877f2', fontWeight: 'bold', fontSize: '1.1rem' }}>f</span>
  </button>
  <button style={socialBtn} onClick={() => alert('Twitter login coming soon!')}>
    <span style={{ color: '#1da1f2', fontWeight: 'bold' }}>𝕏</span>
  </button>
</div>
            </div>
        </div>
    );
}
const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '25px',
    border: 'none',
    marginBottom: '16px',
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    outline: 'none',
    fontSize: '15px',
    boxSizing: 'border-box',
    display: 'block',
};
const btnStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '25px',
    border: 'none',
    background: 'rgba(255,255,255,0.3)',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '8px',
};
const socialBtn = {
  width: '45px', height: '45px',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.2)',
  border: 'none', cursor: 'pointer',
  display: 'flex', alignItems: 'center',
  justifyContent: 'center'
};
export default Login;