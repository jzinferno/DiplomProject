import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  CircularProgress,
  Button,
  Alert
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const Neofetch = () => {
  const [neofetchData, setNeofetchData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNeofetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/neofetch');
      
      if (!response.ok) {
        throw new Error(`Помилка: ${response.status}`);
      }
      
      const data = await response.json();
      setNeofetchData(data.output);
    } catch (err) {
      console.error('Помилка команди neofetch:', err);
      setError('Не вдалося отримати дані.');
    } finally {
      setLoading(false);
    }
  };

  // Загрузка данных при первом рендере компонента
  useEffect(() => {
    fetchNeofetchData();
  }, []);

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Информация о системе (Neofetch)
        </Typography>
        
        <Button 
          variant="contained" 
          startIcon={<RefreshIcon />}
          onClick={fetchNeofetchData}
          disabled={loading}
        >
          Оновити
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          borderRadius: 2,
          bgcolor: '#282c34',
          color: '#f8f8f8',
          minHeight: '60vh',
          display: 'flex',
          alignItems: loading ? 'center' : 'flex-start',
          justifyContent: loading ? 'center' : 'flex-start'
        }}
      >
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          <Box component="pre" sx={{ 
            fontFamily: 'monospace', 
            whiteSpace: 'pre-wrap', 
            wordBreak: 'break-word',
            width: '100%'
          }}>
            {neofetchData}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Neofetch;