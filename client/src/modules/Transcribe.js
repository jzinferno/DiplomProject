import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  TextField,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';

const Transcribe = () => {
  const [transcriptionResult, setTranscriptionResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [audioPath, setAudioPath] = useState('/home/jzinferno/Projects/DiplomProject/server/test.wav');

  const handleTranscribe = async (method) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method: method,
          audioPath: audioPath
        }),
      });

      if (!response.ok) {
        throw new Error(`Помилка: ${response.status}`);
      }

      const data = await response.json();
      setTranscriptionResult(data.transcription);
    } catch (err) {
      console.error(`Не вдалося транскрибувати ${method}:`, err);
      setError(`Не вдалося транскрибувати за допомогою ${method}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Транскрибація аудио
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Шлях до аудиофайла"
              variant="outlined"
              value={audioPath}
              onChange={(e) => setAudioPath(e.target.value)}
              margin="normal"
            />
          </Grid>
          
          <Grid item xs={12} sm={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<MicIcon />}
              onClick={() => handleTranscribe('whisper')}
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              Transcribe With Whisper
            </Button>
          </Grid>
        </Grid>
      </Paper>

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
          minHeight: '40vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography variant="h6" gutterBottom>
          Результат транскрибації:
        </Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TextField
            multiline
            fullWidth
            variant="outlined"
            value={transcriptionResult}
            InputProps={{
              readOnly: true,
            }}
            minRows={10}
            maxRows={15}
            sx={{ flexGrow: 1 }}
          />
        )}
      </Paper>
    </Box>
  );
};

export default Transcribe;