import React, { useState } from 'react';
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
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

function ChoresManager() {
  // Mock data - replace with real data later
  const [chores, setChores] = useState([
    { id: 1, task: 'Clean Kitchen', assignee: 'John', completed: false },
    { id: 2, task: 'Take out Trash', assignee: 'Emily', completed: true },
    { id: 3, task: 'Vacuum Living Room', assignee: 'Mike', completed: false },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newChore, setNewChore] = useState({ task: '', assignee: '' });

  // Mock roommates data - replace with real data later
  const roommates = ['John', 'Emily', 'Mike'];

  const handleToggleComplete = (choreId) => {
    setChores(chores.map(chore =>
      chore.id === choreId ? { ...chore, completed: !chore.completed } : chore
    ));
  };

  const handleDeleteChore = (choreId) => {
    setChores(chores.filter(chore => chore.id !== choreId));
  };

  const handleAddChore = () => {
    if (newChore.task && newChore.assignee) {
      setChores([
        ...chores,
        {
          id: chores.length + 1,
          task: newChore.task,
          assignee: newChore.assignee,
          completed: false,
        },
      ]);
      setNewChore({ task: '', assignee: '' });
      setOpenDialog(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2">
            Chores List
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Add Chore
          </Button>
        </Box>

        <List>
          {chores.map((chore) => (
            <ListItem
              key={chore.id}
              divider
              sx={{
                opacity: chore.completed ? 0.7 : 1,
                textDecoration: chore.completed ? 'line-through' : 'none',
              }}
            >
              <Checkbox
                checked={chore.completed}
                onChange={() => handleToggleComplete(chore.id)}
              />
              <ListItemText
                primary={chore.task}
                secondary={`Assigned to: ${chore.assignee}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteChore(chore.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        {/* Add Chore Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Add New Chore</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Chore Description"
              type="text"
              fullWidth
              value={newChore.task}
              onChange={(e) => setNewChore({ ...newChore, task: e.target.value })}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Assign To</InputLabel>
              <Select
                value={newChore.assignee}
                label="Assign To"
                onChange={(e) => setNewChore({ ...newChore, assignee: e.target.value })}
              >
                {roommates.map((roommate) => (
                  <MenuItem key={roommate} value={roommate}>
                    {roommate}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleAddChore} variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
}

export default ChoresManager;