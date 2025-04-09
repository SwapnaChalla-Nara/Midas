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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Eye, Folder, Lock, Unlock } from 'lucide-react';
import styles from './ResultsGrid.module.css'; // Import CSS Module

interface ResultsGridProps {
  results: Array<{
    docId: string;
    source: string;
    aNumber: string;
    cNumber: string;
    folderName: string;
    access: boolean;
    filePath: string; // Path to the folder
    imageUrl: string; // URL of the image to view
  }>;
  loading: boolean;
  onToggleAccess: (docId: string) => void;
}

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
  ariaLabel: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, onClick, icon, ariaLabel }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      background: 'white',
      cursor: 'pointer',
    }}
  >
    {icon}
    {label}
  </button>
);

const ResultsGrid: React.FC<ResultsGridProps> = ({ results, loading, onToggleAccess }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenFolder = (filePath: string) => {
    window.open(filePath, '_blank'); // Open the folder path in a new tab
  };

  const handleViewImage = (imageUrl: string) => {
    setModalImage(imageUrl); // Set the image URL for the modal
    setOpenModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
    setModalImage(null); // Clear the image URL
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
            {paginatedResults.map((row) => (
              <TableRow key={row.docId}>
                <TableCell>{row.source}</TableCell>
                <TableCell>{row.aNumber}</TableCell>
                <TableCell>{row.cNumber}</TableCell>
                <TableCell>{row.docId}</TableCell>
                <TableCell>{row.folderName}</TableCell>
                <TableCell>{row.access ? 'Yes' : 'No'}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                    <ActionButton
                      label="Set Access"
                      onClick={() => onToggleAccess(row.docId)}
                      icon={row.access ? <Unlock /> : <Lock />}
                      ariaLabel={`Toggle access for document ${row.docId}`}
                    />
                    <ActionButton
                      label="View"
                      onClick={() => handleViewImage(row.imageUrl)}
                      icon={<Eye />}
                      ariaLabel={`View document ${row.docId}`}
                    />
                    <ActionButton
                      label="Folder"
                      onClick={() => handleOpenFolder(row.filePath)}
                      icon={<Folder />}
                      ariaLabel={`Open folder for document ${row.docId}`}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={results.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal for viewing the image */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>View Document</DialogTitle>
        <DialogContent>
          {modalImage && <img src={modalImage} alt="Document" style={{ width: '100%' }} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
const results = [
  {
    docId: '1',
    source: 'System A',
    aNumber: 'A123',
    cNumber: 'C456',
    folderName: 'Folder 1',
    access: true,
    filePath: 'https://example.com/folder1',
    imageUrl: 'https://example.com/image1.jpg',
  },
  {
    docId: '2',
    source: 'System B',
    aNumber: 'A789',
    cNumber: 'C012',
    folderName: 'Folder 2',
    access: false,
    filePath: 'https://example.com/folder2',
    imageUrl: 'https://example.com/image2.jpg',
  },
];
export default ResultsGrid;