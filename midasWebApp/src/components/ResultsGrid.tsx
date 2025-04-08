import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  CircularProgress
} from '@mui/material';
import { Eye, Folder, Lock, Unlock } from 'lucide-react';
import { RootState } from '../store/store';
import { toggleAccess } from '../store/features/searchSlice';

const ResultsGrid = () => {
  const dispatch = useDispatch();
  const { results, loading } = useSelector((state: RootState) => state.search);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="results table">
        <TableHead>
          <TableRow>
            <TableCell>Source</TableCell>
            <TableCell>A Number</TableCell>
            <TableCell>C Number</TableCell>
            <TableCell>Doc ID</TableCell>
            <TableCell>Folder Name</TableCell>
            <TableCell>Access</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((row) => (
            <TableRow key={row.docId}>
              <TableCell>{row.source}</TableCell>
              <TableCell>{row.aNumber}</TableCell>
              <TableCell>{row.cNumber}</TableCell>
              <TableCell>{row.docId}</TableCell>
              <TableCell>{row.folderName}</TableCell>
              <TableCell>{row.access ? 'Yes' : 'No'}</TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => dispatch(toggleAccess(row.docId))}
                    startIcon={row.access ? <Unlock /> : <Lock />}
                  >
                    Set Access
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Eye />}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Folder />}
                  >
                    Folder
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultsGrid;