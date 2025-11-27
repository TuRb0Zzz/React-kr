import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  Box
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

function Navigation({ darkMode, toggleDarkMode }) {
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          💻 Трекер технологий
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            variant={location.pathname === '/' ? 'outlined' : 'text'}
          >
            Главная
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/technologies"
            variant={location.pathname === '/technologies' ? 'outlined' : 'text'}
          >
            Все технологии
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/add"
            variant={location.pathname === '/add' ? 'outlined' : 'text'}
          >
            Добавить
          </Button>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2">
              {darkMode ? '🌙' : '☀️'}
            </Typography>
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              color="default"
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;