import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import qrImage from '../assets/qrcode.jpeg';

function CheckoutForm({ amount }) {
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [expired, setExpired] = useState(false);
  const [method, setMethod] = useState('upi');

  const formatTime = (seconds) => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${minutes}:${secs}`;
  };

  const handleUpiPayment = () => {
    if (expired) {
      alert('QR code has expired. Please refresh the page to generate a new one.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('UPI payment flow is starting. Please scan the QR code with your UPI app.');
    }, 500);
  };

  const refreshQr = () => {
    setTimeLeft(300);
    setExpired(false);
  };

  useEffect(() => {
    if (expired) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [expired]);

  return (
    <div style={{
      background: 'rgba(255,255,255,0.15)',
      borderRadius: '20px',
      padding: '32px',
      width: '420px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.25)'
    }}>
      <h2 style={{ color: 'white', marginBottom: '8px', textAlign: 'center' }}>
        Choose Payment Method
      </h2>
      <p style={{ color: 'white', marginBottom: '18px', textAlign: 'center', opacity: 0.9 }}>
        Total: ₹{amount}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', marginBottom: '18px' }}>
        <button
          onClick={() => setMethod('upi')}
          style={{
            border: '2px solid #10b981',
            background: 'rgba(16, 185, 129, 0.18)',
            color: 'white',
            borderRadius: '12px',
            padding: '10px 6px',
            cursor: 'pointer',
            fontWeight: '600',
            textTransform: 'capitalize'
          }}
        >
          UPI
        </button>
      </div>

      {method === 'upi' && (
        <div style={{ background: 'white', borderRadius: '16px', padding: '16px', color: '#111827', marginBottom: '16px' }}>
          <p style={{ margin: '0 0 8px', fontWeight: '700', textAlign: 'center' }}>Scan UPI QR</p>
          <p style={{ margin: '0 0 12px', textAlign: 'center', fontSize: '13px', color: '#4b5563' }}>
            Open any UPI app and scan this code to pay ₹{amount}.
          </p>
          <p style={{ margin: '0 0 12px', textAlign: 'center', fontSize: '13px', color: expired ? '#dc2626' : '#047857', fontWeight: '700' }}>
            {expired ? 'QR code expired' : `Expires in ${formatTime(timeLeft)}`}
          </p>

          {!expired && (
            <>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #e5e7eb',
                borderRadius: '14px',
                padding: '12px',
                marginBottom: '12px',
                background: '#f9fafb'
              }}>
                <img
                  src={qrImage}
                  alt="UPI QR code"
                  style={{ width: '180px', height: '180px', objectFit: 'contain', borderRadius: '10px' }}
                />
              </div>

              <button
                onClick={handleUpiPayment}
                disabled={loading}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', background: '#10b981', color: 'white', border: 'none', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer' }}
              >
                {loading ? 'Processing...' : 'Pay with UPI'}
              </button>
            </>
          )}

          {expired && (
            <button
              onClick={refreshQr}
              style={{ marginTop: '12px', width: '100%', padding: '12px', borderRadius: '12px', background: '#2563eb', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer' }}
            >
              Refresh QR
            </button>
          )}
        </div>
      )}

      <div style={{ marginTop: '12px', color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', textAlign: 'center' }}>
        Card and Net Banking are under development and coming soon.
      </div>
    </div>
  );
}

function payment() {
  const location = useLocation();
  const amount = location.state?.amount || 0;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <CheckoutForm amount={amount} />
    </div>
  );
}

export default payment;
