'use client'

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Snackbar } from '@mui/material';

export default function EmailList() {
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log('Email submitted:', email);
    setEmail('');
    setOpen(true);
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', p: 4, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom sx={{color:'#DB2B39',fontWeight:'çbold'}}>
        Subscribe to Our Newsletter
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mr: 1, mb: { xs: 1, sm: 0 } }}
        />
        <Button variant="contained" type="submit" sx={{ bgcolor: '#DB2B39',height:'56px' }}>
          Subscribe
        </Button>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Thank you for subscribing!"
      />
    </Box>
  );
}