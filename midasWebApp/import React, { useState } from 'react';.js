import React, { useState } from 'react';
import { Grid, TextField, Button, Paper, Alert } from '@mui/material';
import { Search } from '@mui/icons-material'; // Updated to use Material-UI icons
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
    <Paper elevation={12} className={styles.container}>
      <form onSubmit={handleSearch} aria-label="Search form">
        <Grid container spacing={2}>
          {error && (
            <Grid item xs={8}>
              <Alert severity="error" role="alert">
                {error}
              </Alert>
            </Grid>
          )}
          <Grid item xs={8} sm={4} md={2}>
            <TextField
              fullWidth
              label="Doc ID"
              variant="outlined"
              onChange={(e) => handleInputChange('docId', e.target.value)}
              aria-label="Document ID"
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <TextField
              fullWidth
              label="Source"
              variant="outlined"
              onChange={(e) => handleInputChange('source', e.target.value)}
              aria-label="Source"
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <TextField
              fullWidth
              label="A Number"
              variant="outlined"
              onChange={(e) => handleInputChange('aNumber', e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <TextField
              fullWidth
              label="C Number"
              variant="outlined"
              onChange={(e) => handleInputChange('cNumber', e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <TextField
              fullWidth
              label="Middle Name"
              variant="outlined"
              onChange={(e) => handleInputChange('middleName', e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <TextField
              fullWidth
              label="YOB"
              variant="outlined"
              onChange={(e) => handleInputChange('yob', e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <TextField
              fullWidth
              label="MOB"
              variant="outlined"
              onChange={(e) => handleInputChange('mob', e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <TextField
              fullWidth
              label="DOB"
              variant="outlined"
              onChange={(e) => handleInputChange('dob', e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <TextField
              fullWidth
              label="Country of Birth"
              variant="outlined"
              onChange={(e) => handleInputChange('countryOfBirth', e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <TextField
              fullWidth
              label="PO Birth"
              variant="outlined"
              onChange={(e) => handleInputChange('poBirth', e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <TextField
              fullWidth
              label="Registered State"
              variant="outlined"
              onChange={(e) => handleInputChange('registeredState', e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <TextField
              fullWidth
              label="File Number"
              variant="outlined"
              onChange={(e) => handleInputChange('fileNumber', e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <TextField
              fullWidth
              label="PO Text"
              variant="outlined"
              onChange={(e) => handleInputChange('poText', e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <TextField
              fullWidth
              label="YOE"
              variant="outlined"
              onChange={(e) => handleInputChange('yoe', e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <TextField
              fullWidth
              label="Line"
              variant="outlined"
              onChange={(e) => handleInputChange('line', e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <TextField
              fullWidth
              label="Row No"
              variant="outlined"
              onChange={(e) => handleInputChange('rowNo', e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <TextField
              fullWidth
              label="Format"
              variant="outlined"
              onChange={(e) => handleInputChange('format', e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <TextField
              fullWidth
              label="Soundex"
              variant="outlined"
              onChange={(e) => handleInputChange('soundex', e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <TextField
              fullWidth
              label="Calcd Soundex"
              variant="outlined"
              onChange={(e) => handleInputChange('calcdSoundex', e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4} md={2}>
            <TextField
              fullWidth
              label="Comment"
              variant="outlined"
              onChange={(e) => handleInputChange('comment', e.target.value)}
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