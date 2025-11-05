import React, { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [open, setOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({
    paidBy: '',
    paidFor: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPaymentData({
      paidBy: '',
      paidFor: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleAddPayment = () => {
    if (paymentData.paidBy && paymentData.paidFor && paymentData.amount) {
      setPayments([...payments, { ...paymentData, id: Date.now() }]);
      handleClose();
    }
  };

  const calculateBalances = () => {
    const balances = {};
    payments.forEach(payment => {
      const { paidBy, paidFor, amount } = payment;
      if (!balances[paidBy]) balances[paidBy] = 0;
      if (!balances[paidFor]) balances[paidFor] = 0;
      balances[paidBy] += parseFloat(amount);
      balances[paidFor] -= parseFloat(amount);
    });
    return balances;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Payments
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        sx={{ mb: 2 }}
      >
        Add Payment
      </Button>

      <Paper elevation={3} sx={{ mb: 3, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Current Balances
        </Typography>
        <List>
          {Object.entries(calculateBalances()).map(([person, balance]) => (
            <ListItem key={person}>
              <ListItemText
                primary={`${person}: ${balance > 0 ? 'Owed $' + balance.toFixed(2) : 'Owes $' + (-balance).toFixed(2)}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Payment History
        </Typography>
        <List>
          {payments.map((payment) => (
            <ListItem key={payment.id}>
              <ListItemText
                primary={`${payment.paidBy} paid $${payment.amount} for ${payment.description}`}
                secondary={`${payment.paidFor} owes $${payment.amount} • ${payment.date}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Payment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Paid By"
            fullWidth
            value={paymentData.paidBy}
            onChange={(e) => setPaymentData({ ...paymentData, paidBy: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Paid For"
            fullWidth
            value={paymentData.paidFor}
            onChange={(e) => setPaymentData({ ...paymentData, paidFor: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={paymentData.amount}
            onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={paymentData.description}
            onChange={(e) => setPaymentData({ ...paymentData, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={paymentData.date}
            onChange={(e) => setPaymentData({ ...paymentData, date: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddPayment}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Payments;