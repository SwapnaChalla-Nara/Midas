import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  CircularProgress,
  TablePagination,
  Button,
  Collapse,
} from '@mui/material';
import { Eye, Folder, Lock, Unlock } from 'lucide-react';
import AddIcon from '@mui/icons-material/Add'; // Material-UI Add Icon
import RemoveIcon from '@mui/icons-material/Remove'; // Material-UI Remove Icon
import styles from './ResultsGrid.module.css'; // Import CSS Module

interface ResultsGridProps {
  results: Array<{
    docId: string;
    source: string;
    aNumber: string;
    cNumber: string;
    firstName: string;
    middleName: string;
    lastName: string;
    yob: string;
    mob: string;
    dob: string;
    countryOfBirth: string;
    poBirth: string;
    folderName: string;
    access: boolean;
    filePath: string; // Path to the folder
    imageUrl: string; // URL of the image to view
  }>;
  loading: boolean;
  onToggleAccess: (docId: string) => void;
}

const ResultsGrid: React.FC<ResultsGridProps> = ({ results, loading, onToggleAccess }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleRowExpansion = (docId: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(docId)) {
        newSet.delete(docId);
      } else {
        newSet.add(docId);
      }
      return newSet;
    });
  };

  const handleOpenFolder = (filePath: string) => {
    window.open(filePath, '_blank'); // Open the folder path in a new tab
  };

  const handleViewImage = (imageUrl: string) => {
    window.open(imageUrl, '_blank'); // Open the image URL in a new tab
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress aria-label="Loading results" />
      </Box>
    );
  }

  if (results.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', p: 3 }} aria-live="polite">
        No results found.
      </Box>
    );
  }

  const paginatedResults = results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper className={styles.container}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="Results table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Doc ID</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>A Number</TableCell>
              <TableCell>C Number</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Middle Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>YOB</TableCell>
              <TableCell>MOB</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Country of Birth</TableCell>
              <TableCell>PO Birth</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedResults.map((row) => (
              <React.Fragment key={row.docId}>
                <TableRow>
                  <TableCell>
                    <Button
                      size="small"
                      onClick={() => toggleRowExpansion(row.docId)}
                      startIcon={expandedRows.has(row.docId) ? <RemoveIcon /> : <AddIcon />}
                    >
                      {expandedRows.has(row.docId) ? 'Collapse' : 'Expand'}
                    </Button>
                  </TableCell>
                  <TableCell>{row.docId}</TableCell>
                  <TableCell>{row.source}</TableCell>
                  <TableCell>{row.aNumber}</TableCell>
                  <TableCell>{row.cNumber}</TableCell>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.middleName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.yob}</TableCell>
                  <TableCell>{row.mob}</TableCell>
                  <TableCell>{row.dob}</TableCell>
                  <TableCell>{row.countryOfBirth}</TableCell>
                  <TableCell>{row.poBirth}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={13} style={{ padding: 0 }}>
                    <Collapse in={expandedRows.has(row.docId)} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 2 }}>
                        <Table size="small" aria-label="Sub-table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Source</TableCell>
                              <TableCell>A Number</TableCell>
                              <TableCell>C Number</TableCell>
                              <TableCell>Folder Name</TableCell>
                              <TableCell>Access</TableCell>
                              <TableCell>Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow key={`${row.docId}-sub`}>
                              <TableCell>{row.source}</TableCell>
                              <TableCell>{row.aNumber}</TableCell>
                              <TableCell>{row.cNumber}</TableCell>
                              <TableCell>{row.folderName}</TableCell>
                              <TableCell>{row.access ? 'Yes' : 'No'}</TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                  <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() => onToggleAccess(row.docId)}
                                    startIcon={row.access ? <Unlock /> : <Lock />}
                                  >
                                    Set Access
                                  </Button>
                                  <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() => handleViewImage(row.imageUrl)}
                                    startIcon={<Eye />}
                                  >
                                    View
                                  </Button>
                                  <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() => handleOpenFolder(row.filePath)}
                                    startIcon={<Folder />}
                                  >
                                    Folder
                                  </Button>
                                </Box>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 25]}
        component="div"
        count={results.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ResultsGrid;