import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !password) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/v1/user/signup', {
        username,
        email,
        password,
      });

      console.log('Full Response Data:', response.data); // Log the full response

      const { token } = response.data;
      if (token) {
        localStorage.setItem('authToken', token);
        navigate(`/workspace`);
      } else {
        console.error('Token is undefined');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="sign-up-form">
      <div className="form-area">
        <h1 style={{ marginBlock: '19px' }}>Sign Up</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="name-email-area">
            <label>Name</label>
            <input
              type="text"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
              value={username}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div>
            <button type="submit">Sign Up</button>
          </div>
        </form>
        <span>Already a User? <Link to={'/signin'}>SignIn</Link></span>
      </div>
    </div>
  );
};

export default Signup;
