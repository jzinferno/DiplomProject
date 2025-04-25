import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
} from '@mui/material';

const RealTime = () => {
  const [time, setTime] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
    ampm: '',
    dayOfWeek: '',
    day: '',
    month: '',
    year: ''
  });

  const updateTime = () => {
    const now = new Date();
    
    const hours = now.getHours();
    const hours12 = hours % 12 || 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const days = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'];
    const months = ['Січня', 'Лютого', 'Березня', 'Квітня', 'Травня', 'Червня', 'Липня', 'Серпня', 'Вересня', 'Жовтня', 'Листопада', 'Грудня'];
    
    const dayOfWeek = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    
    setTime({
      hours: hours12.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
      ampm,
      dayOfWeek,
      day,
      month,
      year
    });
  };

  useEffect(() => {
    updateTime();
    
    const intervalId = setInterval(updateTime, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box sx={{ py: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 5 }}>
        Дата та час
      </Typography>

      <Paper 
        elevation={6} 
        sx={{ 
          p: 5,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #1976d2 0%, #304ffe 100%)',
          color: 'white',
          textAlign: 'center',
          maxWidth: 700,
          mx: 'auto'
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Grid container justifyContent="center" alignItems="center" spacing={1}>
            <Grid item>
              <Typography 
                variant="h1" 
                component="span" 
                sx={{ 
                  fontWeight: 'bold', 
                  fontSize: { xs: '4rem', sm: '6rem', md: '8rem' },
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em',
                  textShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }}
              >
                {time.hours}
              </Typography>
            </Grid>
            <Grid item>
              <Typography 
                variant="h1" 
                component="span" 
                sx={{ 
                  fontWeight: 'bold', 
                  fontSize: { xs: '4rem', sm: '6rem', md: '8rem' },
                  animation: 'pulse 1s infinite',
                  '@keyframes pulse': {
                    '0%, 100%': {
                      opacity: 1
                    },
                    '50%': {
                      opacity: 0.5
                    }
                  }
                }}
              >
                :
              </Typography>
            </Grid>
            <Grid item>
              <Typography 
                variant="h1" 
                component="span" 
                sx={{ 
                  fontWeight: 'bold', 
                  fontSize: { xs: '4rem', sm: '6rem', md: '8rem' },
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em',
                  textShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }}
              >
                {time.minutes}
              </Typography>
            </Grid>
            <Grid item>
              <Typography 
                variant="h1" 
                component="span" 
                sx={{ 
                  fontWeight: 'bold', 
                  fontSize: { xs: '4rem', sm: '6rem', md: '8rem' },
                  animation: 'pulse 1s infinite',
                  '@keyframes pulse': {
                    '0%, 100%': {
                      opacity: 1
                    },
                    '50%': {
                      opacity: 0.5
                    }
                  }
                }}
              >
                :
              </Typography>
            </Grid>
            <Grid item>
              <Typography 
                variant="h1" 
                component="span" 
                sx={{ 
                  fontWeight: 'bold', 
                  fontSize: { xs: '4rem', sm: '6rem', md: '8rem' },
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em',
                  textShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }}
              >
                {time.seconds}
              </Typography>
            </Grid>
            <Grid item>
              <Typography 
                variant="h4" 
                component="span" 
                sx={{ 
                  ml: 1,
                  fontWeight: 'bold',
                  verticalAlign: 'top'
                }}
              >
                {time.ampm}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 'medium',
            mb: 1,
            fontFamily: 'sans-serif'
          }}
        >
          {time.dayOfWeek}
        </Typography>
        
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'light',
            opacity: 0.9
          }}
        >
          {time.day} {time.month} {time.year}
        </Typography>
      </Paper>
    </Box>
  );
};

export default RealTime;