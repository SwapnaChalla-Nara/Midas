import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Box, Alert } from '@mui/material';
import SearchForm from './components/SearchForm/SearchForm';
import ResultsGrid from './components/ResultsGrid/ResultsGrid';
import { RootState, AppDispatch } from './store/store';
import { startSearch, searchSuccess, searchFailure, toggleAccess } from './store/features/searchSlice';
import styles from './App.module.css';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { results, loading, error } = useSelector((state: RootState) => state.search);

  const handleSearch = async (searchParams: Record<string, string>) => {
    dispatch(startSearch());

    try {
      // Simulate an API call with a timeout
      const response = await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          if (Math.random() > 0.8) {
            reject(new Error('Network error: Failed to fetch results.'));
          } else {
            resolve([
              {
                docId: '1',
                source: 'System A',
                aNumber: 'A123',
                cNumber: 'C456',
                folderName: 'Folder 1',
                access: true,
              },
              {
                docId: '2',
                source: 'System B',
                aNumber: 'A789',
                cNumber: 'C012',
                folderName: 'Folder 2',
                access: false,
              },
            ]);
          }
        }, 1000);

        // Simulate a timeout error
        setTimeout(() => {
          clearTimeout(timeout);
          reject(new Error('Request timed out. Please try again.'));
        }, 5000); // Timeout after 5 seconds
      });

      dispatch(searchSuccess(response as any));
    } catch (err: any) {
      dispatch(searchFailure(err.message));
    }
  };

  const handleToggleAccess = (docId: string) => {
    dispatch(toggleAccess(docId));
  };

  return (
    <Container maxWidth="xl" className={styles.container}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Document Search System
        </Typography>

        {error && (
          <Box mb={2}>
            <Alert severity="error" role="alert">
              {error}
            </Alert>
          </Box>
        )}

        <SearchForm onSearch={handleSearch} />
        <ResultsGrid results={results} loading={loading} onToggleAccess={handleToggleAccess} />
      </Box>
    </Container>
  );
}

export default App;