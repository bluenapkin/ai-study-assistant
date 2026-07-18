import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard-page">

      <div className="navbar">
        <h1 className="navbar-title">AI Study Assistant</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <h2>Welcome back!</h2>
        <p>What would you like to do today?</p>

        <div className="cards-grid">

          <div className="card">
            <h3>Upload PDF</h3>
            <p>Upload your lecture files and let AI read them for you.</p>
          </div>

          <div className="card">
            <h3>Chat with AI</h3>
            <p>Ask questions about your lectures and get instant answers.</p>
          </div>

          <div className="card">
            <h3>Generate MCQ</h3>
            <p>Auto-generate exam questions from your lecture content.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;