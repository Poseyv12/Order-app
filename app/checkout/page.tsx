'use client'

import React, { useState, ChangeEvent, useEffect } from 'react';
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
import { useRouter, useSearchParams } from 'next/navigation';
import { SelectChangeEvent } from '@mui/material/Select';
import { Suspense } from 'react';

// Define an interface for your cart item
interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

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
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pickupTime: '',
  });

  useEffect(() => {
    const cartItemsParam = searchParams.get('cartItems');
    if (cartItemsParam) {
      try {
        const decodedCartItems = JSON.parse(decodeURIComponent(cartItemsParam)) as CartItem[];
        setCartItems(decodedCartItems);
      } catch (error) {
        console.error('Error parsing cart items:', error);
      }
    }
  }, [searchParams]);

  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically process the order
    console.log('Order submitted:', formData);
    // Redirect to the order success page
    router.push('/order-success');
  };

  const cartTotal = cartItems.reduce((sum, item: CartItem) => sum + item.price * item.quantity, 0);

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
                        onChange={handleTextInputChange}
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
                        onChange={handleTextInputChange}
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
                          onChange={handleSelectChange}
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
                  {cartItems.map((item) => (
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
