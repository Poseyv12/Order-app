'use client'

import React from 'react';
import { Container, Grid, Card, CardContent } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ViewTracker from '../../Componets/viewTracker';
import { useRouter } from 'next/navigation';

import {
    Box,
    Typography,
    Paper,
    AppBar,
    Toolbar,
    IconButton,
    
  } from '@mui/material';
// Mock data for sales
const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4500 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 5500 },
];
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
export default function AdminDashboard() {
  const router = useRouter();

  return (
    
    <Box sx={{ flexGrow: 1, p: 3 }}>
         <AppBar position="static" sx={{ bgcolor: '#DB2B39' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           
            </Typography>
            <IconButton color="inherit" onClick={() => router.push('/')}>
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      <Container maxWidth="lg">
        <Typography sx={{ fontWeight: 'bold', color: 'black', fontSize: '2rem', marginBottom: '2rem' }} variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Sales</Typography>
                <Typography variant="h4">$28,000</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Orders</Typography>
                <Typography variant="h4">156</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Order Value</Typography>
                <Typography variant="h4">$179.49</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <ViewTracker />
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Sales Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
