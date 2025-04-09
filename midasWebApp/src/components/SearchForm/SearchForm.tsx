import React, { useState } from 'react';
import { Grid, TextField, Button, Paper, Alert } from '@mui/material';
import { Search } from 'lucide-react';
import styles from './SearchForm.module.css'; // Import CSS Module

interface SearchFormProps {
  onSearch: (searchParams: Record<string, string>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setSearchParams((prev) => ({ ...prev, [field]: value }));
    setError(null); // Clear error when user starts typing
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate required fields
    if (!searchParams.docId && !searchParams.source) {
      setError('Please provide at least a Doc ID or Source to search.');
      return;
    }

    onSearch(searchParams);
  };

  return (
    <Paper elevation={3} className={styles.container}>
      <form onSubmit={handleSearch} aria-label="Search form">
        <Grid container spacing={2}>
          {error && (
            <Grid item xs={12}>
              <Alert severity="error" role="alert">
                {error}
              </Alert>
            </Grid>
          )}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Doc ID"
              variant="outlined"
              onChange={(e) => handleInputChange('docId', e.target.value)}
              aria-label="Document ID"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Source"
              variant="outlined"
              onChange={(e) => handleInputChange('source', e.target.value)}
              aria-label="Source"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="A Number"
              variant="outlined"
              onChange={(e) => handleInputChange('aNumber', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="C Number"
              variant="outlined"
              onChange={(e) => handleInputChange('cNumber', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={styles.actions}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Search />}
                size="large"
                aria-label="Search documents"
              >
                Search
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default SearchForm;