'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import {
  Box, Typography, TextField, Button, List, ListItem,
  ListItemText, ListItemSecondaryAction, IconButton,
  Select, MenuItem as MuiMenuItem, FormControl, InputLabel
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

interface MenuItem {
  id: number
  name: string
  category: string
  price: number
  image: string
  description: string
  quantityAvailable: number
}

const categories = ['Cakes', 'Pastries', 'Breads', 'Cookies']

export default function AdminPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [newItem, setNewItem] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    category: '',
    price: 0,
    image: '',
    description: '',
    quantityAvailable: 0
  })
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    fetchMenuItems()
  }, [])

  async function fetchMenuItems() {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
    if (error) console.error('Error fetching menu items:', error)
    else setMenuItems(data || [])
  }

  async function addMenuItem() {
    const { error } = await supabase
      .from('menu_items')
      .insert([newItem])
    if (error) console.error('Error adding menu item:', error)
    else {
      fetchMenuItems()
      setNewItem({
        name: '',
        category: '',
        price: 0,
        image: '',
        description: '',
        quantityAvailable: 0
      })
    }
  }

  async function updateMenuItem(id: number, updates: Partial<MenuItem>) {
    const { error } = await supabase
      .from('menu_items')
      .update(updates)
      .eq('id', id)
    if (error) console.error('Error updating menu item:', error)
    else fetchMenuItems()
  }

  async function deleteMenuItem(id: number) {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id)
    if (error) console.error('Error deleting menu item:', error)
    else fetchMenuItems()
  }

  const seedMenu = async () => {
    setIsSeeding(true);
    try {
      const response = await fetch('/api/seed-menu', { method: 'POST' });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert('Error seeding menu');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'black' }}>Admin Dashboard</Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>Add New Menu Item</Typography>
        <TextField
          label="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: 'black' } }}
          InputProps={{ style: { color: 'black' } }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel sx={{ color: 'black' }}>Category</InputLabel>
          <Select
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            sx={{ color: 'black' }}
          >
            {categories.map((category) => (
              <MuiMenuItem key={category} value={category} sx={{ color: 'black' }}>{category}</MuiMenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Price"
          type="number"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: 'black' } }}
          InputProps={{ style: { color: 'black' } }}
        />
        <TextField
          label="Image URL"
          value={newItem.image}
          onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: 'black' } }}
          InputProps={{ style: { color: 'black' } }}
        />
        <TextField
          label="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          fullWidth
          margin="normal"
          multiline
          rows={3}
          InputLabelProps={{ style: { color: 'black' } }}
          InputProps={{ style: { color: 'black' } }}
        />
        <TextField
          label="Quantity Available"
          type="number"
          value={newItem.quantityAvailable}
          onChange={(e) => setNewItem({ ...newItem, quantityAvailable: Number(e.target.value) })}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: 'black' } }}
          InputProps={{ style: { color: 'black' } }}
        />
        <Button variant="contained" onClick={addMenuItem} sx={{ mt: 2, color: 'black', backgroundColor: 'white' }}>
          Add Item
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom sx={{ color: 'black' }}>Menu Items</Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={<Typography sx={{ color: 'black' }}>{item.name}</Typography>}
              secondary={<Typography sx={{ color: 'black' }}>{`${item.category} - $${item.price.toFixed(2)}`}</Typography>}
            />
            <TextField
              type="number"
              value={item.quantityAvailable}
              onChange={(e) => updateMenuItem(item.id, { quantityAvailable: Number(e.target.value) })}
              sx={{ width: 80, mr: 2 }}
              InputProps={{ style: { color: 'black' } }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => deleteMenuItem(item.id)}>
                <DeleteIcon sx={{ color: 'black' }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <button onClick={seedMenu} disabled={isSeeding}>
        {isSeeding ? 'Seeding...' : 'Seed Menu Items'}
      </button>
    </Box>
  )
}
