import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Map from './components/Map';
import './App.css';
// import AppLayout from './components/AppLayout';

function App() {
  return (
    // <>
    //   <AppLayout />
    // </>
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box sx={{ height: '70vh', width: '100%' }}>
          <Map />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
