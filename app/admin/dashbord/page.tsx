'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container, Grid, Card, CardContent, Box, Typography, Paper, AppBar, Toolbar, IconButton, Button
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ViewTracker from '../../Componets/viewTracker';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type Order = {
  id: number;
  created_at: string;
  total: number;
  status: string;
};

type SalesData = {
  month: string;
  sales: number;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data || []);
        processOrdersData(data || []);
      }
    };

    fetchOrders();
  }, [supabase]);

  const processOrdersData = (orders: Order[]) => {
    const monthlySales: { [key: string]: number } = {};
    orders.forEach(order => {
      const month = new Date(order.created_at).toLocaleString('default', { month: 'short' });
      monthlySales[month] = (monthlySales[month] || 0) + order.total;
    });

    const salesData = Object.entries(monthlySales).map(([month, sales]) => ({
      month,
      sales: Number(sales.toFixed(2))
    }));

    setSalesData(salesData);
  };

  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = orders.length > 0 ? totalSales / orders.length : 0;

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <AppBar position="static" sx={{ bgcolor: '#DB2B39' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{color:'white', flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button 
            color="inherit" 
            startIcon={<ShoppingCartIcon />}
            onClick={() => router.push('/admin/orders')}
            sx={{ color:'white',mr: 2 }}
          >
            Orders
          </Button>
          <IconButton color="inherit" onClick={() => router.push('/')}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Typography sx={{ color:'black',fontWeight: 'bold', fontSize: '2rem', marginBottom: '2rem', mt: 3 }} variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Sales</Typography>
                <Typography variant="h4">${totalSales.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Orders</Typography>
                <Typography variant="h4">{orders.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Order Value</Typography>
                <Typography variant="h4">${averageOrderValue.toFixed(2)}</Typography>
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
