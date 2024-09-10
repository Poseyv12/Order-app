'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CustomMotionComponent } from '../Componets/CustomMotionComponent';
import { Box as MuiBox } from '@mui/material';

type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  quantityAvailable: number;
  sold_out: boolean;
  description: string;
};

type MenuItemListProps = {
  menuItems: MenuItem[];
  onAddToCart: (item: MenuItem, quantity: number) => void;
  getAvailableQuantity: (item: MenuItem) => number;
};

const MotionBox = CustomMotionComponent(MuiBox);

const StyledCard = styled(Card)<{ disabled: boolean }>(({ disabled }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  opacity: disabled ? 0.5 : 1,
  transition: 'opacity 0.3s ease',
}));

const StyledCardMedia = styled(CardMedia)({
  height: 200, // Fixed height for all images
  objectFit: 'cover',
});

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: 'auto',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&:disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
}));

const MotionStyledCard = CustomMotionComponent(StyledCard);

const MenuItemList = ({ menuItems, onAddToCart, getAvailableQuantity }: MenuItemListProps) => {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    // Initialize quantities with 1 for each available item
    const initialQuantities = menuItems.reduce((acc, item) => {
      const availableQuantity = getAvailableQuantity(item);
      if (availableQuantity > 0) {
        acc[item.id] = 1;
      }
      return acc;
    }, {} as { [key: number]: number });
    setQuantities(initialQuantities);
  }, [menuItems, getAvailableQuantity]);

  const handleQuantityChange = (item: MenuItem, delta: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the click from bubbling up to the card
    const availableQuantity = getAvailableQuantity(item);
    setQuantities(prev => {
      const currentQuantity = prev[item.id] || 1;
      const newQuantity = Math.max(1, Math.min(currentQuantity + delta, availableQuantity));
      return { ...prev, [item.id]: newQuantity };
    });
  };

  const handleAddToCart = (item: MenuItem, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the click from bubbling up to the card
    const quantity = quantities[item.id] || 1;
    if (quantity > 0) {
      onAddToCart(item, quantity);
      setQuantities(prev => ({ ...prev, [item.id]: 1 })); // Reset to 1 after adding to cart
    }
  };

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <>
      <MotionBox 
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap={2}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {menuItems.map((item) => {
          const availableQuantity = getAvailableQuantity(item);
          const isDisabled = availableQuantity === 0;

          return (
            <MotionBox gridColumn="span 4" key={item.id} variants={itemVariants}>
              <MotionStyledCard 
                disabled={isDisabled}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleItemClick(item)}
              >
                <StyledCardMedia
                  image={item.image}
                  title={item.name}
                />
                <StyledCardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.name}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" color="black">
                      ${item.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color={isDisabled ? 'error' : 'success.main'}>
                      {isDisabled ? 'Sold Out' : `${availableQuantity} available`}
                    </Typography>
                  </Box>
                  {!isDisabled && (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <IconButton sx={{ color: 'white' }} onClick={(e) => handleQuantityChange(item, -1, e)} disabled={quantities[item.id] <= 1}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{quantities[item.id] || 1}</Typography>
                      <IconButton onClick={(e) => handleQuantityChange(item, 1, e)} disabled={quantities[item.id] >= availableQuantity}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                  )}
                  <StyledButton 
                    onClick={(e) => handleAddToCart(item, e)}
                    disabled={isDisabled}
                    fullWidth
                    sx={{ color: 'white' }}
                  >
                    {isDisabled ? 'Sold Out' : 'Add to Cart'}
                  </StyledButton>
                </StyledCardContent>
              </MotionStyledCard>
            </MotionBox>
          );
        })}
      </MotionBox>

      <Dialog open={!!selectedItem} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedItem && (
          <>
            <DialogTitle>{selectedItem.name}</DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={selectedItem.image}
                  alt={selectedItem.name}
                  sx={{ objectFit: 'cover', height: '300px', width: '300px', borderRadius: 1, mb: 2 }}
                />
                <Typography variant="body1" gutterBottom>
                  {selectedItem.description}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  ${selectedItem.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color={getAvailableQuantity(selectedItem) === 0 ? 'error' : 'success.main'}>
                  {getAvailableQuantity(selectedItem) === 0 ? 'Sold Out' : `${getAvailableQuantity(selectedItem)} available`}
                </Typography>
                {getAvailableQuantity(selectedItem) > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <IconButton onClick={(e) => handleQuantityChange(selectedItem, -1, e)} disabled={quantities[selectedItem.id] <= 1}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 2 }}>{quantities[selectedItem.id] || 1}</Typography>
                    <IconButton onClick={(e) => handleQuantityChange(selectedItem, 1, e)} disabled={quantities[selectedItem.id] >= getAvailableQuantity(selectedItem)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button 
                onClick={(e) => {
                  handleAddToCart(selectedItem, e);
                  handleCloseDialog();
                }}
                disabled={getAvailableQuantity(selectedItem) === 0}
                variant="contained"
                sx={{ color: 'white' }}
              >
                Add to Cart
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default MenuItemList;