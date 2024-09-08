import React from 'react';
import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#DB2B39', color: 'white', py: 6, mt: 6 }}>
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
  );
}
