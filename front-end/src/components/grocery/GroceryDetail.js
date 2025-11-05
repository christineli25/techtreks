import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

function GroceryDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const groceryItems = location.state?.items || [];

  const calculateTotal = () => {
    return groceryItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Grocery List Details
          </Typography>
          
          <List>
            {groceryItems.map((item) => (
              <ListItem key={item.id} divider>
                <ListItemText
                  primary={item.item}
                  secondary={`$${item.price.toFixed(2)}`}
                />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    checked={item.purchased}
                    disabled
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
            <Typography variant="h6" align="right">
              Total: ${calculateTotal()}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default GroceryDetail;