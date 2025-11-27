import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Dashboard from './components/Dashboard';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Navigation from './components/Navigation';
import { useLocalStorage } from './hooks/useLocalStorage';

// Кастомная тема
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    ...(mode === 'dark' && {
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
    }),
  },
});

function App() {
  const [technologies, setTechnologies] = useLocalStorage('technologies', [
    {
      id: 1,
      title: 'React Components',
      description: 'Изучение функциональных компонентов, хуков и JSX',
      category: 'frontend',
      status: 'completed',
      notes: 'Освоил useState, useEffect, useContext',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Material-UI',
      description: 'Изучение библиотеки компонентов Material Design',
      category: 'ui-library',
      status: 'in-progress',
      notes: 'Разобрался с ThemeProvider и кастомизацией',
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Node.js',
      description: 'Изучение серверной платформы на JavaScript',
      category: 'backend',
      status: 'not-started',
      notes: '',
      createdAt: new Date().toISOString()
    },
    {
      id: 4,
      title: 'MongoDB',
      description: 'Изучение NoSQL базы данных',
      category: 'database',
      status: 'not-started',
      notes: '',
      createdAt: new Date().toISOString()
    }
  ]);
  
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  
  const theme = React.useMemo(
    () => createTheme(getDesignTokens(darkMode ? 'dark' : 'light')),
    [darkMode]
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addTechnology = (techData) => {
    const newTech = {
      id: Date.now(),
      ...techData,
      createdAt: new Date().toISOString()
    };
    setTechnologies(prev => [...prev, newTech]);
    return newTech;
  };

  const updateTechnologyStatus = (techId, newStatus) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, status: newStatus } : tech
      )
    );
  };

  const deleteTechnology = (techId) => {
    setTechnologies(prev => prev.filter(tech => tech.id !== techId));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <Router>
          <div className="App">
            <Navigation 
              darkMode={darkMode} 
              toggleDarkMode={toggleDarkMode} 
            />
            <Routes>
              <Route 
                path="/" 
                element={
                  <Dashboard 
                    technologies={technologies}
                    onStatusChange={updateTechnologyStatus}
                  />
                } 
              />
              <Route 
                path="/technologies" 
                element={
                  <TechnologyList 
                    technologies={technologies}
                    onStatusChange={updateTechnologyStatus}
                    onDelete={deleteTechnology}
                  />
                } 
              />
              <Route 
                path="/technology/:id" 
                element={
                  <TechnologyDetail 
                    technologies={technologies}
                    onStatusChange={updateTechnologyStatus}
                  />
                } 
              />
              <Route 
                path="/add" 
                element={
                  <AddTechnology 
                    onAddTechnology={addTechnology}
                  />
                } 
              />
            </Routes>
          </div>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;