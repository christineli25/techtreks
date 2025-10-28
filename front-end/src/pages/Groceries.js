import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Paper,
  Box,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Groceries = () => {
  const [groceryItem, setGroceryItem] = useState('');
  const [groceryList, setGroceryList] = useState([]);

  const handleAddItem = () => {
    if (groceryItem.trim()) {
      setGroceryList([...groceryList, { name: groceryItem, id: Date.now() }]);
      setGroceryItem('');
    }
  };

  const handleDeleteItem = (id) => {
    setGroceryList(groceryList.filter(item => item.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Grocery List
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            label="Add grocery item"
            value={groceryItem}
            onChange={(e) => setGroceryItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
          />
          <Button
            variant="contained"
            onClick={handleAddItem}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Box>
      </Paper>
      
      <Paper elevation={3}>
        <List>
          {groceryList.map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.name} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Groceries;