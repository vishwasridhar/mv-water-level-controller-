import { useState } from 'react';
import axios from 'axios';

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! 👋 I am your shopping assistant. How can I help you?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/chat/message', {
        message: input
      });
      setMessages(prev => [...prev, { role: 'bot', text: res.data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, something went wrong!' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>

      {/* Chat Window */}
      {open && (
        <div style={{
          width: '320px',
          height: '450px',
          background: '#1a1a2e',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            padding: '16px',
            borderRadius: '16px 16px 0 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <p style={{ color: 'white', fontWeight: 'bold', margin: 0 }}>🤖 AI Assistant</p>
              <p style={{ color: '#c4b5fd', fontSize: '0.75rem', margin: 0 }}>Online</p>
            </div>
            <button onClick={() => setOpen(false)} style={{
              background: 'none', border: 'none',
              color: 'white', fontSize: '1.2rem', cursor: 'pointer'
            }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto',
            padding: '16px',
            display: 'flex', flexDirection: 'column', gap: '8px'
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                background: msg.role === 'user' ? '#7c3aed' : '#2d2d44',
                color: 'white',
                padding: '10px 14px',
                borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                maxWidth: '80%',
                fontSize: '0.85rem',
                lineHeight: '1.4'
              }}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div style={{
                alignSelf: 'flex-start',
                background: '#2d2d44',
                color: '#a78bfa',
                padding: '10px 14px',
                borderRadius: '16px 16px 16px 4px',
                fontSize: '0.85rem'
              }}>
                typing...
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{
            padding: '12px',
            borderTop: '1px solid #2d2d44',
            display: 'flex', gap: '8px'
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask me anything..."
              style={{
                flex: 1, padding: '10px',
                borderRadius: '20px', border: 'none',
                background: '#2d2d44', color: 'white',
                outline: 'none', fontSize: '0.85rem'
              }}
            />
            <button onClick={sendMessage} style={{
              background: '#7c3aed', border: 'none',
              color: 'white', borderRadius: '50%',
              width: '38px', height: '38px',
              cursor: 'pointer', fontSize: '1rem'
            }}>➤</button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '56px', height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
          border: 'none', color: 'white',
          fontSize: '1.5rem', cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(124,58,237,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
        {open ? '✕' : '🤖'}
      </button>
    </div>
  );
}

export default ChatBot;