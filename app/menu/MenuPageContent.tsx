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
import { useTheme, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    backgroundColor: 'white',
    color: 'black',
  },
}));

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      <AppBar position="static" sx={{ bgcolor: '#ffc8dd' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit" aria-label="back to home" href="/" sx={{ color: '#000000' }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ ml: 2, color: '#000000' }}>
              Our Menu
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'center' }}>
            <Image
              src="https://fineryandcake.com/cdn/shop/files/3d-black-no-watercolor-web_300x.png?v=1628389180g"
              alt="Bakery Logo"
              width={100}
              height={50}
            />
          </Box>
          <IconButton color="inherit" aria-label="cart" onClick={() => setIsCartOpen(true)} sx={{ color: '#000000' }}>
            <StyledBadge badgeContent={totalCartItems}>
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Paper elevation={3} sx={{ 
          width: isMobile ? '100px' : '200px', 
          flexShrink: 0, 
          borderRadius: 0,
          overflow: 'auto'
        }}>
          <List component="nav">
            {categories.map((category) => (
              <ListItem key={category} disablePadding>
                <ListItemButton 
                  selected={category === selectedCategory}
                  onClick={() => handleCategorySelect(category)}
                  sx={{
                    bgcolor: category === selectedCategory ? 'primary' : 'transparent',
                    color: category === selectedCategory ? 'white' : 'inherit',
                    '&:hover': {
                      bgcolor: category === selectedCategory ? '#B0222D' : '#e5e5e5',
                    },
                    '&.Mui-selected': {
                      bgcolor: '#ffafcc',
                      '&:hover': {
                        bgcolor: '#ffc8dd',
                      },
                    },
                    padding: isMobile ? '8px 4px' : '8px 16px',
                  }}
                >
                  <ListItemText 
                    primary={category} 
                    primaryTypographyProps={{
                      fontSize: isMobile ? '0.8rem' : '1rem',
                      textAlign: isMobile ? 'center' : 'left',
                    }}
                  />
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