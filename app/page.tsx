'use client'

import React from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Card, CardContent, CardMedia, 
  Grid, Container, Box, Link as MuiLink, InputBase, IconButton
} from '@mui/material';
import { Search, Person, ShoppingCart, Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const navItems = ['Lakeway'];
const menuItems = [''];

const featuredItems = [
  { 
    id: 1, 
    name: "Chocolate Cake", 
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D" 
  },
  { 
    id: 2, 
    name: "Croissant", 
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3JvaXNzYW50fGVufDB8fDB8fHww" 
  },
  { 
    id: 3, 
    name: "Sourdough Bread", 
    image: "https://images.unsplash.com/photo-1585478259715-876a6a81fc08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c291cmRvdWdoJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D" 
  },
];

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" component={motion.div} 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        sx={{ bgcolor: '#Dfff', color: 'black' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src="https://fineryandcake.com/cdn/shop/files/3d-black-no-watercolor-web_300x.png?v=1628389180g"
              alt="Bakery Logo"
              width={100}
              height={40}
              style={{ marginRight: '16px' }}
            />
            <Box sx={{ display: 'flex' }}>
              {navItems.map((item) => (
                <MuiLink
                  key={item}
                  component={Link}
                  href={`/${item.toLowerCase()}`}
                  sx={{ color: 'white', mx: 1, textDecoration: 'none', fontSize: '0.8rem' }}
                >
                  {item}
                </MuiLink>
              ))}
            </Box>
          </Box>
          <Typography variant="body2">
            CALL US : 713-666-2253
          </Typography>
    
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          {menuItems.map((item) => (
            <MuiLink
              key={item}
              component={Link}
              href={`/${item.toLowerCase().replace(' ', '-')}`}
              sx={{ color: 'black', textDecoration: 'none', fontSize: '0.9rem' }}
            >
              {item}
            </MuiLink>
          ))}
        </Box>

        <Box 
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          sx={{ 
            width: '100%', 
            height: '400px', 
            position: 'relative', 
            my: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Bakery Banner"
            fill
            style={{ objectFit: 'cover' }}
          />
          <Box 
            sx={{ 
              position: 'relative', 
              zIndex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0)',
              padding: '20px',
              borderRadius: '10px'
            }}
          >
            <Link href="/menu" passHref style={{ textDecoration: 'none' }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outlined" 
                  sx={{ 
                    backgroundColor: 'rgba(219, 43, 57, 1)',
                    borderColor: '#fff', 
                    color: '#fff', 
                    borderRadius: '20px',
                    fontSize: '3rem',
                    '&:hover': {
                      borderColor: '#B0222D',
                      backgroundColor: 'rgba(219, 43, 57, 0.2)'
                    }
                  }}
                >
                  ORDER ONLINE
                </Button>
              </motion.div>
            </Link>
          </Box>
        </Box>

        <Box sx={{ bgcolor: '#DB2B39', color: 'white', py: 4, textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontStyle: 'italic', mb: 2 }}>
            Shop Our Sweet Treats & Baked Goods Online
          </Typography>
          <Typography variant="body1">
            View our menu and order some tasty treats today!
          </Typography>
        </Box>

        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' , color: 'black'}}>
          FEATURED TASTY TREATS
        </Typography>

        <Grid container spacing={4}>
          {featuredItems.map((item, index) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.name}
                    sx={{
                      height: 200,
                      objectFit: 'cover'
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.name}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

      </Container>

<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>        <Link href="/menu" passHref style={{ textDecoration: 'none' }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outlined" 
                  sx={{ 
                    backgroundColor: 'rgba(219, 43, 57, 1)',
                    borderColor: '#fff', 
                    color: '#fff', 
                    borderRadius: '20px',
                    fontSize: '3rem',
                    '&:hover': {
                      borderColor: '#B0222D',
                      backgroundColor: 'rgba(219, 43, 57, 0.2)'
                    }
                  }}
                >
                  ORDER ONLINE
                </Button>
              </motion.div>
            </Link>
            </Box>
      <Box component={motion.footer}
  initial={{ y: 100 }}
  animate={{ y: 0 }}
  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
  sx={{ bgcolor: '#DB2B39', color: 'white', py: 6, mt: 6 }}
  >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body2">
                We are a family-owned bakery dedicated to bringing you the finest baked goods using traditional recipes and the freshest ingredients.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2">
                123 Bakery Street, Houston, TX 77001
              </Typography>
              <Typography variant="body2">
                Email: info@threebrothers.com
              </Typography>
              <Typography variant="body2">
                Phone: (713) 666-2253
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton color="inherit" aria-label="Facebook" component="a" href="https://facebook.com">
                  <Facebook />
                </IconButton>
                <IconButton color="inherit" aria-label="Twitter" component="a" href="https://twitter.com">
                  <Twitter />
                </IconButton>
                <IconButton color="inherit" aria-label="Instagram" component="a" href="https://instagram.com">
                  <Instagram />
                </IconButton>
                <IconButton color="inherit" aria-label="YouTube" component="a" href="https://youtube.com">
                  <YouTube />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Typography variant="body2" align="center">
              © {new Date().getFullYear()} Three Brothers Bakery. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}