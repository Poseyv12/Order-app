'use client'

import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
    AppBar,
    Toolbar,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

// This should be replaced with actual cart data, possibly from a global state or context
const sampleCartItems = [
  { id: 1, name: 'Chocolate Cake', price: 25.99, quantity: 2 },
  { id: 2, name: 'Croissant', price: 3.99, quantity: 3 },
];
// Generate pickup times from 9 AM to 8 PM
const generatePickupTimes = () => {
    const times = [];
    for (let hour = 9; hour <= 20; hour++) {
      times.push(`${hour % 12 || 12}:00 ${hour < 12 ? 'AM' : 'PM'}`);
      times.push(`${hour % 12 || 12}:30 ${hour < 12 ? 'AM' : 'PM'}`);
    }
    return times;
  };
  
  const pickupTimes = generatePickupTimes();
  
export default function CheckoutPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pickupTime: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name as string]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically process the order
    console.log('Order submitted:', formData);
    // Redirect to the order success page
    router.push('/order-success');
  };

  const cartTotal = sampleCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: '#DB2B39' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() => router.back()}
            sx={{ mr: 2, color: 'white' }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,color: 'white'}}>
            Checkout
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, p: 2, bgcolor: '#f5f5f5' }}>
        <Box sx={{ maxWidth: 800, margin: 'auto' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Pickup Information
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth required>
                        <InputLabel id="pickup-time-label">Pickup Time</InputLabel>
                        <Select
                          labelId="pickup-time-label"
                          id="pickup-time"
                          name="pickupTime"
                          value={formData.pickupTime}
                          label="Pickup Time"
                          onChange={handleInputChange}
                        >
                          {pickupTimes.map((time) => (
                            <MenuItem key={time} value={time}>
                              {time}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2, color: 'white', bgcolor: '#DB2B39', '&:hover': { bgcolor: '#B0222D' } }}
                      >
                        Place Order
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <List>
                  {sampleCartItems.map((item) => (
                    <ListItem key={item.id}>
                      <ListItemText
                        primary={item.name}
                        secondary={`Quantity: ${item.quantity}`}
                      />
                      <Typography variant="body2">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1">
                    Total: ${cartTotal.toFixed(2)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
