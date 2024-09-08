'use client'

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/navigation';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DB2B39',
    },
  },
});

// Mock data for orders
const mockOrders = [
  { id: 1, customerName: 'John Doe', items: ['Chocolate Cake', 'Croissant'], total: 29.98, status: 'new', pickupTime: '2:30 PM' },
  { id: 2, customerName: 'Jane Smith', items: ['Vanilla Cupcake', 'Coffee'], total: 8.50, status: 'preparing', pickupTime: '3:00 PM' },
  { id: 3, customerName: 'Bob Johnson', items: ['Baguette', 'Cheese Danish'], total: 12.75, status: 'ready', pickupTime: '2:45 PM' },
];

export default function AdminOrdersDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Simulating real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, you'd fetch new orders from a backend here
      const newOrder = {
        id: orders.length + 1,
        customerName: `Customer ${orders.length + 1}`,
        items: ['New Item'],
        total: Math.random() * 50,
        status: 'new',
        pickupTime: '4:00 PM',
      };
      setOrders(prevOrders => [newOrder, ...prevOrders]);
    }, 30000); // Add a new order every 30 seconds

    return () => clearInterval(interval);
  }, [orders]);

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order);
  };

  const handleCloseDialog = () => {
    setSelectedOrder(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'error';
      case 'preparing': return 'warning';
      case 'ready': return 'success';
      default: return 'default';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static" sx={{ bgcolor: '#DB2B39' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Admin Orders Dashboard
            </Typography>
            <IconButton color="inherit" onClick={() => router.push('/')}>
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5' }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Incoming Orders
            </Typography>
            <List>
              {orders.map((order) => (
                <ListItem 
                  key={order.id} 
                  onClick={() => handleOrderClick(order)}
                  sx={{ 
                    cursor: 'pointer', 
                    '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
                    mb: 1,
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                  }}
                >
                  <ListItemText
                    primary={`Order #${order.id} - ${order.customerName}`}
                    secondary={`Total: $${order.total.toFixed(2)} | Pickup: ${order.pickupTime}`}
                  />
                  <Chip 
                    label={order.status} 
                    color={getStatusColor(order.status) as any}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>

      <Dialog  fullWidth open={!!selectedOrder} onClose={handleCloseDialog}>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box sx={{ width: '100%' }}>
              <Typography variant="h6">{`Order #${selectedOrder.id}`}</Typography>
              <Typography>{`Customer: ${selectedOrder.customerName}`}</Typography>
              <Typography>{`Pickup Time: ${selectedOrder.pickupTime}`}</Typography>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Items:</Typography>
              <List>
                {selectedOrder.items.map((item: string, index: number) => (
                  <ListItem key={index}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              <Typography variant="h6">{`Total: $${selectedOrder.total.toFixed(2)}`}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
