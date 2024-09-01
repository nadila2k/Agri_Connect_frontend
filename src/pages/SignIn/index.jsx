import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Checkbox, FormControlLabel, Divider, IconButton, Snackbar, Alert } from '@mui/material';
import { Visibility, VisibilityOff, Google, Facebook, Twitter } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
  import SignUp from '../SignUp/index.jsx'; 

const SignIn = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();  // Initialize the useNavigate hook

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });

  const handleSignInSubmit = async (event) => {
    event.preventDefault();

    
    if (!email || !password) {
      setAlert({ open: true, message: 'Please fill in all required fields', severity: 'warning' });
      return;
    }

    const payload = {
      email,
      password,
    };

    try {
      console.log(payload)
      const response = await fetch('http://localhost:5001/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setAlert({ open: true, message: 'Sign in successful!', severity: 'success' });
        // Optionally redirect the user after success
      } else {
        setAlert({ open: true, message: result.message || 'Sign in failed', severity: 'error' });
      }
    } catch (error) {
      setAlert({ open: true, message: 'Network error. Please try again later.', severity: 'error' });
    }
  };



  const handleCloseAlert = () => {
    setAlert({ open: false, message: '', severity: '' });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleNavigateToSignUp = () => {
    navigate('/sign-up');
  };
  

  return (
    <Container component="main" maxWidth="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f9f6f2' }}>
      <Box
        sx={{
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <Typography component="h1" variant="h4" style={{ fontWeight: 'bold', color: '#333333', marginBottom: '1.5rem' }}>
          Sign In
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSignInSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Phone number, username or email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              style: {
                borderRadius: '8px',
              },
            }}
          />
          <Box sx={{ position: 'relative' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                style: {
                  borderRadius: '8px',
                },
                endAdornment: (
                  <IconButton onClick={handleTogglePassword} edge="end" style={{ position: 'absolute', right: '10px', top: '10px' }}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          </Box>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember for 30 days"
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" color="primary" style={{ marginBottom: '1rem', cursor: 'pointer' }}>
            Forgot password?
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{
              backgroundColor: '#004d40',
              color: '#ffffff',
              borderRadius: '8px',
              padding: '0.75rem',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s, box-shadow 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#00332c')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#004d40')}
          >
            Sign in
          </Button>
          <Button
            fullWidth
            variant="contained"
            style={{
              marginTop: '1rem',
              backgroundColor: '#d84315',
              color: '#ffffff',
              borderRadius: '8px',
              padding: '0.75rem',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s, box-shadow 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#bf360c')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#d84315')}
            onClick={handleNavigateToSignUp}  // Add the onClick handler
          >
            Create New Account
          </Button>
          <Divider sx={{ my: 3 }}>Or continue with</Divider>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <IconButton>
              <Google sx={{ color: '#db4437' }} />
            </IconButton>
            <IconButton>
              <Facebook sx={{ color: '#4267B2' }} />
            </IconButton>
            <IconButton>
              <Twitter sx={{ color: '#1DA1F2' }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ width: '100%' }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          style={{ fontSize: '1rem' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignIn;
