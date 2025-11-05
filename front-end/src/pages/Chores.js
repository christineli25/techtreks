import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Paper,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Chores = () => {
  const [chores, setChores] = useState([]);
  const [open, setOpen] = useState(false);
  const [choreData, setChoreData] = useState({
    title: '',
    assignedTo: '',
    dueDate: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setChoreData({
      title: '',
      assignedTo: '',
      dueDate: '',
    });
  };

  const handleAddChore = () => {
    if (choreData.title && choreData.assignedTo && choreData.dueDate) {
      setChores([...chores, { ...choreData, id: Date.now() }]);
      handleClose();
    }
  };

  const handleDeleteChore = (id) => {
    setChores(chores.filter(chore => chore.id !== id));
  };

  const getRemainingTime = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days >= 0 ? `${days} days left` : 'Overdue';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Chores
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        sx={{ mb: 2 }}
      >
        Add Chore
      </Button>

      <Paper elevation={3}>
        <List>
          {chores.map((chore) => (
            <ListItem
              key={chore.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteChore(chore.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={chore.title}
                secondary={`Assigned to: ${chore.assignedTo} | ${getRemainingTime(chore.dueDate)}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Chore</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Chore Title"
            fullWidth
            value={choreData.title}
            onChange={(e) => setChoreData({ ...choreData, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Assigned To"
            fullWidth
            value={choreData.assignedTo}
            onChange={(e) => setChoreData({ ...choreData, assignedTo: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Due Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={choreData.dueDate}
            onChange={(e) => setChoreData({ ...choreData, dueDate: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddChore}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Chores;