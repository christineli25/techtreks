import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Login from './pages/Login';
import ProfileCreation from './pages/ProfileCreation';
import Dashboard from './pages/Dashboard';
import Chores from './pages/Chores';
import Payments from './pages/Payments';
import Groceries from './pages/Groceries';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile-creation" element={<ProfileCreation />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chores" element={<Chores />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/groceries" element={<Groceries />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
