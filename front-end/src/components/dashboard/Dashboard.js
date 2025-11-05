import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  AssignmentTurnedIn as ChoresIcon,
  ShoppingCart as GroceryIcon,
  AccountBalance as PaymentsIcon
} from '@mui/icons-material';

function Dashboard() {
  // Mock data - replace with real data later
  const choresPreview = [
    { task: 'Clean Kitchen', assignee: 'John' },
    { task: 'Take out Trash', assignee: 'Emily' }
  ];

  const groceryPreview = [
    { item: 'Milk', price: 4.99 },
    { item: 'Bread', price: 3.49 }
  ];

  const paymentsPreview = {
    totalDue: 150.00,
    splitAmount: 50.00,
    roommates: 3
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Chores Summary */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ChoresIcon color="primary" sx={{ mr: 1 }} />
              <Typography component="h2" variant="h6" color="primary">
                Chores Overview
              </Typography>
            </Box>
            <List>
              {choresPreview.map((chore, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={chore.task}
                    secondary={`Assigned to: ${chore.assignee}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Payments Summary */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PaymentsIcon color="primary" sx={{ mr: 1 }} />
              <Typography component="h2" variant="h6" color="primary">
                Payments Overview
              </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography variant="h4" component="div" gutterBottom>
                ${paymentsPreview.splitAmount.toFixed(2)}
              </Typography>
              <Typography color="text.secondary">
                Your share of ${paymentsPreview.totalDue.toFixed(2)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Split between {paymentsPreview.roommates} roommates
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Grocery Summary */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <GroceryIcon color="primary" sx={{ mr: 1 }} />
              <Typography component="h2" variant="h6" color="primary">
                Grocery List Preview
              </Typography>
            </Box>
            <List>
              {groceryPreview.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={item.item}
                    secondary={`$${item.price.toFixed(2)}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;