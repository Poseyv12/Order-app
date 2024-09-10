'use client'

import React, { useState, useEffect, useCallback } from 'react';
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
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DB2B39',
    },
  },
});

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: number;
  customer_name: string;
  items: CartItem[];
  total: number;
  status: string;
  pickup_time: string;
  created_at: string;
};

export default function AdminOrdersDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const supabase = createClientComponentClient();

  const fetchOrders = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
  
      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, [supabase]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000); // Fetch orders every 30 seconds
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCloseDialog = () => {
    setSelectedOrder(null);
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      fetchOrders(); // Refresh orders after update
    } catch (error) {
      console.error('Error updating order status:', error);
    }
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
                    primary={`Order #${order.id} - ${order.customer_name}`}
                    secondary={
                      <>
                        {`Placed: ${new Date(order.created_at).toLocaleString()} | `}
                        {`Total: $${order.total.toFixed(2)} | Pickup: ${order.pickup_time}`}
                      </>
                    }
                  />
                  <Chip 
                    label={order.status} 
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>

      <Dialog fullWidth open={!!selectedOrder} onClose={handleCloseDialog}>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box sx={{ width: '100%' }}>
              <Typography variant="h6">{`Order #${selectedOrder.id}`}</Typography>
              <Typography>{`Customer: ${selectedOrder.customer_name}`}</Typography>
              <Typography>{`Placed: ${new Date(selectedOrder.created_at).toLocaleString()}`}</Typography>
    <Typography>{`Pickup Time: ${selectedOrder.pickup_time}`}</Typography>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>Items:</Typography>
              <List>
                {selectedOrder.items.map((item: CartItem, index: number) => (
                  <ListItem key={index}>
                    <ListItemText 
                      primary={`${item.name} (x${item.quantity})`} 
                      secondary={`$${(item.price * item.quantity).toFixed(2)}`} 
                    />
                  </ListItem>
                ))}
              </List>
              <Typography variant="h6">{`Total: $${selectedOrder.total.toFixed(2)}`}</Typography>
              <Box sx={{ mt: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => handleStatusChange(selectedOrder.id, 'preparing')}
                  sx={{ mr: 1 }}
                >
                  Mark as Preparing
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={() => handleStatusChange(selectedOrder.id, 'ready')}
                >
                  Mark as Ready
                </Button>
              </Box>
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
