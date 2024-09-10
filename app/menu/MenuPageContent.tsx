'use client';

import React, { useState, useEffect } from 'react';
import { 
  AppBar, Toolbar, Box, Typography, IconButton, List, 
  ListItem, ListItemButton, ListItemText, TextField, Paper, Badge
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import MenuItemList from './MenuItemList';
import CartSidebar from './CartSidebar';
import Footer from '../Componets/Footer';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();
const categories = ['All Categories', 'Cakes', 'Pastries', 'Breads', 'Cookies'];

type MenuItem = {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
    quantityAvailable: number;
    sold_out: boolean; // Add this line
  };

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type MenuPageContentProps = {
  initialMenuItems: MenuItem[];
};

export default function MenuPageContent({ initialMenuItems }: MenuPageContentProps) {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(initialMenuItems);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const { data, error } = await supabase
        .from('menu_items')
        .select('id, name, category, price, image, description, quantityAvailable, sold_out')
        .order('category');
      
      if (error) {
        console.error('Error fetching menu items:', error);
      } else {
        setMenuItems(data || []);
        setFilteredItems(data || []);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    const filtered = menuItems.filter(item => {
      const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredItems(filtered);
  }, [selectedCategory, searchQuery, menuItems]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddToCart = (item: MenuItem, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: Math.min(cartItem.quantity + quantity, item.quantityAvailable) }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });
  };
  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  const handleRemoveFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const getAvailableQuantity = (item: MenuItem) => {
    const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
    return item.quantityAvailable - (cartItem?.quantity || 0);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: '#DB2B39' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back to home" href="/" sx={{ mr: 2, color: 'white' }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
            Our Menu
          </Typography>
          <IconButton color="inherit" aria-label="cart" onClick={() => setIsCartOpen(true)} sx={{ color: 'white' }}>
            <Badge badgeContent={totalCartItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Paper elevation={3} sx={{ width: '200px', flexShrink: 0, borderRadius: 0 }}>
          <List component="nav">
            {categories.map((category) => (
              <ListItem key={category} disablePadding>
                <ListItemButton 
                  selected={category === selectedCategory}
                  onClick={() => handleCategorySelect(category)}
                  sx={{
                    bgcolor: category === selectedCategory ? '#DB2B39' : 'transparent',
                    color: category === selectedCategory ? 'white' : 'inherit',
                    '&:hover': {
                      bgcolor: category === selectedCategory ? '#B0222D' : '#F0A1A8',
                    },
                    '&.Mui-selected': {
                      bgcolor: '#DB2B39',
                      '&:hover': {
                        bgcolor: '#B0222D',
                      },
                    },
                  }}
                >
                  <ListItemText primary={category} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              sx={{ flexGrow: 1, mr: 1 }}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>
          <MenuItemList 
            menuItems={filteredItems} 
            onAddToCart={handleAddToCart} 
            getAvailableQuantity={getAvailableQuantity}
          />
        </Box>
      </Box>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
/>

      <Footer />
    </Box>
  );
}
