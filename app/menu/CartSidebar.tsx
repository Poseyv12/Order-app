'use client';

import React from 'react';
import { 
  Drawer, Box, Typography, IconButton, List, ListItem, 
  ListItemText, Button, Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, newQuantity: number) => void;
};

export default function CartSidebar({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQuantity }: CartSidebarProps) {  const router = useRouter();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const encodedCartItems = encodeURIComponent(JSON.stringify(cartItems));
    router.push(`/checkout?cartItems=${encodedCartItems}`);
    onClose();
  };



  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box sx={{ width: 300, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {cartItems.map((item) => (
            <ListItem key={item.id}>
              <ListItemText 
                primary={item.name} 
                secondary={`$${item.price.toFixed(2)}`} 
              />
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                <IconButton 
                  size="small" 
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                <IconButton 
                  size="small" 
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <IconButton edge="end" aria-label="delete" onClick={() => onRemoveItem(item.id)}>
                <CloseIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Total: ${total.toFixed(2)}
        </Typography>
        <Button 
          variant="contained" 
          fullWidth 
          sx={{ color: 'black', backgroundColor:"#ffc8dd",'&:hover': { bgcolor: '#F0A1A8' } }}
          onClick={handleCheckout}
        >
          CHECKOUT
        </Button>
      </Box>
    </Drawer>
  );
}
