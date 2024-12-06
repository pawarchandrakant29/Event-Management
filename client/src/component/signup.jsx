import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Grid, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from './api';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, { username, email, password });
      setMessage(response.data.message);
      setUsername('');
      setEmail('');
      setPassword('');
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.error || 'Something went wrong!');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 5 }}>
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" sx={{ marginBottom: 3, color: 'primary.main' }}>
          Sign Up
        </Typography>

        {message && <Alert severity="success" sx={{ marginBottom: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 3 }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{
              padding: 1.5,
              fontSize: '1rem',
              '&:hover': { backgroundColor: 'primary.dark' },
            }}
          >
            Sign Up
          </Button>
        </form>

        <Typography align="center" sx={{ marginTop: 3 }}>
          Already have an account?{' '}
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate('/login')}
            sx={{ textTransform: 'none' }}
          >
            Log in
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Signup;
