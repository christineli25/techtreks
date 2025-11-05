import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { Home, Assignment, ShoppingCart, AccountBalance } from '@mui/icons-material';

function MainLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1] || 'dashboard';

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f5f5f5' }}>
      <Box sx={{ flex: 1, overflow: 'auto', pb: 7 }}>
        {children}
      </Box>

      <BottomNavigation
        value={currentPath}
        showLabels
        sx={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
          bgcolor: 'primary.main',
          '& .MuiBottomNavigationAction-root': {
            color: 'white',
          },
          '& .Mui-selected': {
            '& .MuiBottomNavigationAction-label': {
              fontSize: theme => theme.typography.caption.fontSize,
            },
          },
        }}
      >
        <BottomNavigationAction
          label="Home"
          value="dashboard"
          icon={<Home />}
          onClick={() => navigate('/dashboard')}
        />
        <BottomNavigationAction
          label="Chores"
          value="chores"
          icon={<Assignment />}
          onClick={() => navigate('/chores')}
        />
        <BottomNavigationAction
          label="Grocery"
          value="grocery"
          icon={<ShoppingCart />}
          onClick={() => navigate('/grocery')}
        />
        <BottomNavigationAction
          label="Payments"
          value="payments"
          icon={<AccountBalance />}
          onClick={() => navigate('/payments')}
        />
      </BottomNavigation>
    </Box>
  );
}

export default MainLayout;