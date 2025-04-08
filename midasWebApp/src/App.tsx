import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import SearchForm from './components/SearchForm';
import ResultsGrid from './components/ResultsGrid';

function App() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Document Search System
        </Typography>
        
        <SearchForm />
        <ResultsGrid />
      </Box>
    </Container>
  );
}

export default App;