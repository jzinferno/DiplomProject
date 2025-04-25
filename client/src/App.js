import React, { useState } from 'react';
import { 
  CssBaseline, 
  Container, 
  Grid, 
  AppBar, 
  Toolbar, 
  Typography, 
  Box,
  IconButton
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';

import HelloWorld from './modules/HelloWorld';
import Neofetch from './modules/Neofetch';
import Transcribe from './modules/Transcribe';
import RealTime from './modules/RealTime';
import ModuleCard from './components/ModuleCard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [activeModule, setActiveModule] = useState(null);

  const modules = [
    { 
      id: 'helloworld', 
      title: 'Example Hello World!', 
      description: 'Example', 
      component: <HelloWorld /> 
    },
    { 
      id: 'neofetch', 
      title: 'Інформація про систему', 
      description: 'Відображення інформації про систему за допомогою neofetch', 
      component: <Neofetch /> 
    },
    { 
      id: 'transcribe', 
      title: 'Транскрибація аудио', 
      description: 'Транскрибація аудио за допомогою Whisper', 
      component: <Transcribe /> 
    },
    { 
      id: 'realtime', 
      title: 'Дата та час', 
      description: 'Відображення часу в режимі реального часу', 
      component: <RealTime /> 
    }
  ];

  const handleModuleClick = (moduleId) => {
    setActiveModule(moduleId);
  };

  const handleBackToHome = () => {
    setActiveModule(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          {activeModule && (
            <IconButton 
              edge="start" 
              color="inherit" 
              aria-label="home" 
              onClick={handleBackToHome}
              sx={{ mr: 2 }}
            >
              <HomeIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {activeModule 
              ? modules.find(m => m.id === activeModule)?.title || 'Модуль' 
              : 'Дипломний проект'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {activeModule ? (
          <Box>
            {modules.find(m => m.id === activeModule)?.component}
          </Box>
        ) : (
          <Grid container spacing={3}>
            {modules.map((module) => (
              <Grid item xs={12} sm={6} md={4} key={module.id}>
                <ModuleCard 
                  title={module.title}
                  description={module.description}
                  onClick={() => handleModuleClick(module.id)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
