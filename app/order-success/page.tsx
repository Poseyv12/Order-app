'use client'

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffc8dd',
    },
  },
});

export default function OrderSuccessPage() {
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static" sx={{ bgcolor: '#ffc8dd' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back to menu"
              onClick={() => router.push('/menu')}
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Order Confirmation
            </Typography>
          </Toolbar>
        </AppBar>
        <Container component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 400, width: '100%' }}>
              <CheckCircleOutlineIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h4" component="h1" gutterBottom>
                Order Successful!
              </Typography>
              <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                Thank you for your order. Your delicious treats will be ready for pickup at your selected time.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.push('/menu')}
                sx={{ mt: 2 }}
              >
                Back to Menu
              </Button>
            </Paper>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
