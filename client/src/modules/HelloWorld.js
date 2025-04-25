import React from 'react';
import { 
  Box, 
  Typography,
} from '@mui/material';

const HelloWorld = () => {

  return (
    <Box sx={{ py: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 5 }}>
        Hello World!
      </Typography>
    </Box>
  );
};

export default HelloWorld;