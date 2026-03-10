import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/auth/login/`;
    console.log('Logging in with', url);
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('Login response', json);
        if (json.key) {
          localStorage.setItem('authToken', json.key);
          onLogin && onLogin(json);
        } else {
          setError('Failed to login');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Request failed');
      });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-custom">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
