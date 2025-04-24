import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Box, Alert, Button, TextField, Grid, Paper } from '@mui/material';
import SearchForm from './components/SearchForm/SearchForm';
import ResultsGrid from './components/ResultsGrid/ResultsGrid';
import { RootState, AppDispatch } from './store/store';
import { startSearch, searchSuccess, searchFailure, toggleAccess } from './store/features/searchSlice';
import styles from './App.module.css';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { results, loading, error } = useSelector((state: RootState) => state.search);
  const [showGrid, setShowGrid] = useState(false);
  const [searchParams, setSearchParams] = useState<Record<string, string>>({});

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
                imageUrl: 'https://catalog.archives.gov/iiif/3/lz%2Fpresidential-libraries%2Fobama%2Fbho-ero%2F217847615%2FTwitter_Gabi-Chojkier_2016-03-21_05_01.jpg/0,0,1024,1024/512,512/0/default.jpg',
                filePath: '/path/to/folder1',
              },
              {
                docId: '2',
                source: 'System B',
                aNumber: 'A789',
                cNumber: 'C012',
                folderName: 'Folder 2',
                access: false,
                imageUrl: 'https://catalog.archives.gov/iiif/3/lz%2Fpresidential-libraries%2Fobama%2Fbho-ero%2F217847615%2FTwitter_Gabi-Chojkier_2015-04-16_02_01.jpg/0,0,1024,1024/512,512/0/default.jpg',
                filePath: '/path/to/folder2',
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
      setShowGrid(true); // Show the grid after search
    } catch (err: any) {
      dispatch(searchFailure(err.message));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setSearchParams((prev) => ({ ...prev, [field]: value }));
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

        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Doc ID"
                variant="outlined"
                onChange={(e) => handleInputChange('docId', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Source"
                variant="outlined"
                onChange={(e) => handleInputChange('source', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={() => handleSearch(searchParams)}>
                Search
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <ResultsGrid results={results} loading={loading} onToggleAccess={handleToggleAccess} showGrid={showGrid} />
      </Box>
    </Container>
  );
};

export default App;