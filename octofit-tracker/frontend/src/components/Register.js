import React, { useState } from 'react';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setError('Passwords do not match');
      return;
    }
    const url = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/auth/registration/`;
    console.log('Registering via', url);
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password1, password2 }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('Register response', json);
        if (json.key) {
          localStorage.setItem('authToken', json.key);
          onRegister && onRegister(json);
        } else {
          setError('Registration failed');
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
        <h2 className="card-title">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-custom">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
