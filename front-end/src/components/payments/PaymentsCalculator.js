import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Divider,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

function PaymentsCalculator() {
  // Mock data - replace with real data later
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Rent', amount: 2000.00, paidBy: 'John' },
    { id: 2, description: 'Utilities', amount: 150.00, paidBy: 'Emily' },
    { id: 3, description: 'Internet', amount: 80.00, paidBy: 'Mike' },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', paidBy: '' });

  // Mock roommates data - replace with real data later
  const roommates = ['John', 'Emily', 'Mike'];

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.paidBy) {
      setExpenses([
        ...expenses,
        {
          id: expenses.length + 1,
          description: newExpense.description,
          amount: parseFloat(newExpense.amount),
          paidBy: newExpense.paidBy,
        },
      ]);
      setNewExpense({ description: '', amount: '', paidBy: '' });
      setOpenDialog(false);
    }
  };

  const handleDeleteExpense = (expenseId) => {
    setExpenses(expenses.filter(expense => expense.id !== expenseId));
  };

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const calculateSplitAmount = () => {
    return calculateTotalExpenses() / roommates.length;
  };

  const calculateBalances = () => {
    const balances = {};
    roommates.forEach(roommate => {
      balances[roommate] = 0;
    });

    // Calculate what each person paid
    expenses.forEach(expense => {
      balances[expense.paidBy] += expense.amount;
    });

    // Calculate what each person owes
    const splitAmount = calculateSplitAmount();
    roommates.forEach(roommate => {
      balances[roommate] -= splitAmount;
    });

    return balances;
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Expenses List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" component="h2">
                Shared Expenses
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
              >
                Add Expense
              </Button>
            </Box>

            <List>
              {expenses.map((expense) => (
                <ListItem key={expense.id} divider>
                  <ListItemText
                    primary={expense.description}
                    secondary={`Paid by ${expense.paidBy}`}
                  />
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    ${expense.amount.toFixed(2)}
                  </Typography>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteExpense(expense.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>

            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">
                Total Expenses: ${calculateTotalExpenses().toFixed(2)}
              </Typography>
              <Typography variant="subtitle1">
                Split Amount (per person): ${calculateSplitAmount().toFixed(2)}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Balances Summary */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Balance Summary
            </Typography>
            <List>
              {Object.entries(calculateBalances()).map(([roommate, balance]) => (
                <ListItem key={roommate}>
                  <ListItemText primary={roommate} />
                  <Typography
                    variant="body1"
                    color={balance >= 0 ? 'success.main' : 'error.main'}
                  >
                    {balance >= 0 ? 'Gets back' : 'Owes'} ${Math.abs(balance).toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Add Expense Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Expense</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={newExpense.description}
            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            inputProps={{ step: "0.01" }}
          />
          <TextField
            margin="dense"
            label="Paid By"
            select
            fullWidth
            value={newExpense.paidBy}
            onChange={(e) => setNewExpense({ ...newExpense, paidBy: e.target.value })}
          >
            {roommates.map((roommate) => (
              <option key={roommate} value={roommate}>
                {roommate}
              </option>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddExpense} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default PaymentsCalculator;