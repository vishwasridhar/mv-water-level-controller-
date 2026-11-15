import { useNavigate } from "react-router-dom";

function Success() {
    const navigate = useNavigate();
    return (
        <div style={{
            minHeight: '100vh',
            background: '#10b981',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{ fontSize: '5rem'}}>🛒✅</div>
        <h1 styel={{ color: 'white', fontSize: '2.5rem', margin: '20px 0'}}>
        order Placed!
        </h1>
        <p style={{color: 'white', fontSize: '1.2rem', marginBottom: '30px'}}>
            Thanks for purchasing
        </p>
        <button onClick={() => navigate('/dashboard')}
        stylr={{
            background: 'white',
            color: '#10b981',
            border: 'none',
            padding: '14px 32px',
            borderRadius: '25px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold'
        }}>
            Continue Shopping
        </button>
        </div>
    );
}

export default Success;