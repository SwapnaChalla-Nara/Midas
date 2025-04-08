import React from 'react';
import { useDispatch } from 'react-redux';
import { 
  Box, 
  TextField, 
  Grid, 
  Button,
  Paper
} from '@mui/material';
import { Search } from 'lucide-react';
import { setSearchParams, setSearchResults, setLoading } from '../store/features/searchSlice';

const SearchForm = () => {
  const dispatch = useDispatch();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setLoading(true));
    
    // Simulated search results
    const mockResults = [{
      docId: "DOC123",
      source: "Source1",
      aNumber: "A123456",
      cNumber: "C789012",
      firstName: "John",
      middleName: "Robert",
      lastName: "Doe",
      yob: "1980",
      mob: "06",
      dob: "1980-06-15",
      countryOfBirth: "USA",
      poBirth: "New York",
      registeredState: "NY",
      fileNumber: "F123456",
      poeText: "NYC",
      yoe: "2000",
      lineNo: "1",
      rowNo: "1",
      format: "Standard",
      calcdSoundex: "D000",
      soundex: "D000",
      folderName: "Folder1",
      access: true
    }];

    setTimeout(() => {
      dispatch(setSearchResults(mockResults));
      dispatch(setLoading(false));
    }, 1000);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <form onSubmit={handleSearch}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Doc ID"
              variant="outlined"
              onChange={(e) => dispatch(setSearchParams({ docId: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Source"
              variant="outlined"
              onChange={(e) => dispatch(setSearchParams({ source: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="A Number"
              variant="outlined"
              onChange={(e) => dispatch(setSearchParams({ aNumber: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="C Number"
              variant="outlined"
              onChange={(e) => dispatch(setSearchParams({ cNumber: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              onChange={(e) => dispatch(setSearchParams({ firstName: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              onChange={(e) => dispatch(setSearchParams({ lastName: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Search />}
                size="large"
              >
                Search
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default SearchForm;