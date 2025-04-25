import React from 'react';
import { 
  Card, 
  CardContent, 
  CardActionArea, 
  Typography,
  Box
} from '@mui/material';

const ModuleCard = ({ title, description, onClick }) => {
  return (
    <Card 
      elevation={3} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.03)',
        },
      }}
    >
      <CardActionArea 
        onClick={onClick}
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-start',
          justifyContent: 'flex-start' 
        }}
      >
        <CardContent sx={{ flexGrow: 1, width: '100%' }}>
          <Box 
            sx={{ 
              height: 120, 
              bgcolor: 'primary.light', 
              mb: 2, 
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography variant="h4" color="white">
              {title.charAt(0)}
            </Typography>
          </Box>
          <Typography variant="h5" component="div" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ModuleCard;