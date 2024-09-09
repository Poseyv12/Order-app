'use client'

import React, { useState } from 'react';
import { 
  AppBar,
  Toolbar,
  Box, 
  Grid, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button,
  Drawer,
  Badge,
  IconButton,
  Divider,
} from '@mui/material';
import Image from 'next/image';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Footer from '../Componets/Footer';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// Sample data - replace with your actual menu data
const categories = ['Cakes', 'Pastries', 'Breads', 'Cookies'];
import CloseIcon from '@mui/icons-material/Close';
const menuItems = [
  // Cakes
  { id: 1, name: 'Chocolate Cake', category: 'Cakes', price: 25.99, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 2, name: 'Vanilla Bean Cake', category: 'Cakes', price: 23.99, image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHZhbmlsbGElMjBjYWtlfGVufDB8fDB8fHww' },
  { id: 3, name: 'Red Velvet Cake', category: 'Cakes', price: 27.99, image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkJTIwdmVsdmV0JTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 4, name: 'Carrot Cake', category: 'Cakes', price: 26.99, image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fycm90JTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D' },

  // Pastries
  { id: 5, name: 'Croissant', category: 'Pastries', price: 3.99, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3JvaXNzYW50fGVufDB8fDB8fHww' },
  { id: 6, name: 'Danish Pastry', category: 'Pastries', price: 4.50, image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFuaXNoJTIwcGFzdHJ5fGVufDB8fDB8fHww' },
  { id: 7, name: 'Eclair', category: 'Pastries', price: 4.25, image: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWNsYWlyfGVufDB8fDB8fHww' },
  { id: 8, name: 'Cinnamon Roll', category: 'Pastries', price: 3.75, image: 'https://images.unsplash.com/photo-1509365390695-33aee754301f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2lubmFtb24lMjByb2xsfGVufDB8fDB8fHww' },

  // Breads
  { id: 9, name: 'Sourdough Bread', category: 'Breads', price: 6.99, image: 'https://images.unsplash.com/photo-1585478259715-876a6a81fc08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c291cmRvdWdoJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D' },
  { id: 10, name: 'Whole Wheat Bread', category: 'Breads', price: 5.99, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2hvbGUlMjB3aGVhdCUyMGJyZWFkfGVufDB8fDB8fHww' },
  { id: 11, name: 'Baguette', category: 'Breads', price: 4.50, image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFndWV0dGV8ZW58MHx8MHx8fDA%3D' },
  { id: 12, name: 'Rye Bread', category: 'Breads', price: 6.50, image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cnllJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D' },

  // Cookies
  { id: 13, name: 'Croissant', category: 'Cookies', price: 3.99, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3JvaXNzYW50fGVufDB8fDB8fHww' },
  { id: 14, name: 'Sourdough Bread', category: 'Cookies', price: 6.99, image: 'https://images.unsplash.com/photo-1585478259715-876a6a81fc08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c291cmRvdWdoJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D' },
  // Add more menu items as needed
];

export default function MenuPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [cartItems, setCartItems] = useState<Array<{ id: number; name: string; price: number; quantity: number }>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item: { id: number; name: string; price: number }) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    router.push('/checkout');
  };

  // Animation variants for menu items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: '#DB2B39' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back to home"
            onClick={() => router.push('/')}
            sx={{ mr: 2, color: 'white' }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
            Our Menu
          </Typography>
          <IconButton color="inherit" aria-label="cart" onClick={() => setIsCartOpen(true)}>
            <Badge badgeContent={cartItemsCount} color="secondary" sx={{ color: 'white' }}>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      >
        <Box sx={{ width: 350, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Your Cart</Typography>
            <IconButton onClick={() => setIsCartOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.id} secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(item.id)}>
                  <CloseIcon />
                </IconButton>
              }>
                <ListItemText 
                  primary={item.name} 
                  secondary={`$${item.price.toFixed(2)} x ${item.quantity}`} 
                />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="subtitle1">Total: ${cartTotal.toFixed(2)}</Typography>
          </Box>
          <Button 
            variant="contained" 
            fullWidth 
            sx={{ bgcolor: '#DB2B39', color: 'white', '&:hover': { bgcolor: '#B0222D' } }}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </Box>
      </Drawer>

      <Box sx={{ flexGrow: 1, display: 'flex', pt: 3 }}>
        {/* Sidebar */}
        <Box sx={{ 
          width: { xs: 120, sm: 240 }, // Adjust width based on screen size
          flexShrink: 0, 
          bgcolor: 'background.paper', 
          borderRight: 1, 
          borderColor: 'divider',
          position: 'sticky',
          top: 0,
          height: 'calc(100vh - 64px)', // Adjust this value based on your AppBar height
          overflowY: 'auto'
        }}>
          <List>
            {categories.map((category) => (
              <ListItem key={category} disablePadding>
                <ListItemButton 
                  selected={category === selectedCategory}
                  onClick={() => setSelectedCategory(category)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#DB2B39',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#B0222D',
                      },
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(219, 43, 57, 0.08)',
                    },
                  }}
                >
                  <ListItemText 
                    primary={category} 
                    primaryTypographyProps={{ 
                      sx: { 
                        color: category === selectedCategory ? 'white' : 'black',
                        fontWeight: category === selectedCategory ? 'bold' : 'normal',
                        fontSize: { xs: '0.8rem', sm: '1rem' }, // Adjust font size for mobile
                      } 
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Menu Items Grid */}
        <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
          <Grid container spacing={3}>
            {filteredItems.map((item, index) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <Card>
                    <CardMedia
                      component="div"
                      sx={{ height: 140, position: 'relative' }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </CardMedia>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${item.price.toFixed(2)}
                      </Typography>
                      <Button 
                        variant="contained" 
                        sx={{ mt: 2, color: 'white', bgcolor: '#DB2B39', '&:hover': { bgcolor: '#B0222D' } }}
                        onClick={() => addToCart(item)}
                      >
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
