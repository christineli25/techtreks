import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&.completed': {
    '& .MuiListItemText-primary': {
      textDecoration: 'line-through',
      color: theme.palette.text.secondary,
    },
  },
}));

function GroceryList() {
  const TAX_RATE = 0.08; // 8% tax rate
  
  const [groceryItems, setGroceryItems] = useState([
    { id: 1, item: 'Chicken', price: 15.00, purchased: false },
    { id: 2, item: 'Hand Soap', price: 6.50, purchased: true },
    { id: 3, item: 'Toilet Paper', price: 5.00, purchased: false },
    { id: 4, item: 'Eggs', price: 5.00, purchased: false },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newItem, setNewItem] = useState({ item: '', price: '' });
  const [editingItem, setEditingItem] = useState(null);

  const handleTogglePurchased = (itemId) => {
    setGroceryItems(groceryItems.map(item =>
      item.id === itemId ? { ...item, purchased: !item.purchased } : item
    ));
  };

  const handleAddItem = () => {
    if (newItem.item && newItem.price) {
      setGroceryItems([
        ...groceryItems,
        {
          id: groceryItems.length + 1,
          item: newItem.item,
          price: parseFloat(newItem.price),
          purchased: false,
        },
      ]);
      setNewItem({ item: '', price: '' });
      setOpenDialog(false);
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setNewItem({ item: item.item, price: item.price.toString() });
    setOpenEditDialog(true);
  };

  const handleEditSave = () => {
    if (newItem.item && newItem.price && editingItem) {
      setGroceryItems(groceryItems.map(item => 
        item.id === editingItem.id 
          ? { ...item, item: newItem.item, price: parseFloat(newItem.price) }
          : item
      ));
      setNewItem({ item: '', price: '' });
      setEditingItem(null);
      setOpenEditDialog(false);
    }
  };

  const handleDelete = (itemId) => {
    setGroceryItems(groceryItems.filter(item => item.id !== itemId));
  };

  const calculateSubtotal = () => {
    return groceryItems.reduce((total, item) => total + item.price, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * TAX_RATE;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <Box>
      <Container maxWidth="sm" sx={{ pt: 2, pb: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          This Week's Grocery List:
        </Typography>
        <Box sx={{ bgcolor: 'white', borderRadius: 2, boxShadow: 1, p: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            To Buy:
          </Typography>
          <List>
            {groceryItems.map((item) => (
              <StyledListItem
                key={item.id}
                className={item.purchased ? 'completed' : ''}
                disableGutters
              >
                <ListItemIcon>
                  <Checkbox
                    checked={item.purchased}
                    onChange={() => handleTogglePurchased(item.id)}
                    sx={{ ml: -1 }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.item}
                  sx={{ flex: 1 }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton 
                    size="small" 
                    onClick={() => handleEditClick(item)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDelete(item.id)}
                    sx={{ mr: 1 }}
                  >
                    <DeleteIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                  </IconButton>
                  <Typography variant="body1" sx={{ minWidth: 80, textAlign: 'right' }}>
                    ${item.price.toFixed(2)}
                  </Typography>
                </Box>
              </StyledListItem>
            ))}
          </List>

          <Button
            onClick={() => setOpenDialog(true)}
            sx={{
              width: '100%',
              justifyContent: 'flex-start',
              pl: 4,
              color: 'text.secondary',
              '&:hover': { bgcolor: 'transparent' }
            }}
          >
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>+</Typography>
          </Button>

          <Box sx={{ mt: 3, borderTop: 1, borderColor: 'divider', pt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Tax:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${calculateTax().toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                Total:
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                ${calculateTotal().toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Item Name"
            fullWidth
            value={newItem.item}
            onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddItem} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={() => {
        setOpenEditDialog(false);
        setNewItem({ item: '', price: '' });
        setEditingItem(null);
      }}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Item Name"
            fullWidth
            value={newItem.item}
            onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenEditDialog(false);
            setNewItem({ item: '', price: '' });
            setEditingItem(null);
          }}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default GroceryList;