import React from 'react';
import {
  Grid,
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data - in a real app, this would come from your state management system
  const upcomingChores = [
    { id: 1, title: 'Clean kitchen', dueDate: '2025-10-30' },
    { id: 2, title: 'Take out trash', dueDate: '2025-10-28' },
  ];

  const pendingPayments = [
    { id: 1, amount: 25.50, to: 'Alex', for: 'Groceries' },
    { id: 2, amount: 15.00, to: 'Sam', for: 'Internet' },
  ];

  const neededGroceries = [
    { id: 1, item: 'Milk' },
    { id: 2, item: 'Bread' },
    { id: 3, item: 'Eggs' },
  ];

  const DashboardCard = ({ title, items, buttonText, onButtonClick }) => (
    <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={
                title === 'Upcoming Chores' ? item.title :
                title === 'Pending Payments' ? `Owe ${item.to} $${item.amount} for ${item.for}` :
                item.item
              }
              secondary={title === 'Upcoming Chores' ? `Due: ${item.dueDate}` : null}
            />
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        fullWidth
        onClick={onButtonClick}
        sx={{ mt: 2 }}
      >
        {buttonText}
      </Button>
    </Paper>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <DashboardCard
            title="Upcoming Chores"
            items={upcomingChores}
            buttonText="View All Chores"
            onButtonClick={() => navigate('/chores')}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard
            title="Pending Payments"
            items={pendingPayments}
            buttonText="View All Payments"
            onButtonClick={() => navigate('/payments')}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard
            title="Needed Groceries"
            items={neededGroceries}
            buttonText="View Grocery List"
            onButtonClick={() => navigate('/groceries')}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;