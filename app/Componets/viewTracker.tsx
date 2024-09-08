import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for views
const viewData = [
  { date: '2023-06-01', views: 1000 },
  { date: '2023-06-02', views: 1200 },
  { date: '2023-06-03', views: 1500 },
  { date: '2023-06-04', views: 1300 },
  { date: '2023-06-05', views: 1700 },
  { date: '2023-06-06', views: 1600 },
  { date: '2023-06-07', views: 1800 },
];

export default function ViewTracker() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Website Views
        </Typography>
        <Typography variant="h4" gutterBottom>
          {viewData.reduce((sum, day) => sum + day.views, 0)}
        </Typography>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={viewData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="views" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
