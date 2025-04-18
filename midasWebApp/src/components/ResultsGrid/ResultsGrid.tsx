import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams, GridColumnVisibilityModel } from '@mui/x-data-grid';
import { Button, Box, Snackbar } from '@mui/material';
import { Eye, Folder, Lock, Unlock } from 'lucide-react';

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
    access?: boolean; // Optional to avoid runtime errors
    filePath: string; // Path to the folder
    imageUrl: string; // URL of the image to view
  }>;
  onToggleAccess: (docId: string) => void;
  showGrid: boolean; // New prop to control grid visibility
}

const openUrl = (url: string) => {
  if (url) {
    window.open(url, '_blank');
  } else {
    console.error('Invalid URL');
  }
};

const ResultsGrid: React.FC<ResultsGridProps> = ({ results, onToggleAccess, showGrid }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleToggleAccess = (docId: string) => {
    onToggleAccess(docId);
    setSnackbarOpen(true);
  };

  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    { field: 'docId', headerName: 'Doc ID', flex: 1 },
    { field: 'source', headerName: 'Source', flex: 1 },
    { field: 'aNumber', headerName: 'A Number', flex: 1 },
    { field: 'cNumber', headerName: 'C Number', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'middleName', headerName: 'Middle Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'yob', headerName: 'YOB', flex: 1 },
    { field: 'mob', headerName: 'MOB', flex: 1 },
    { field: 'dob', headerName: 'DOB', flex: 1 },
    { field: 'countryOfBirth', headerName: 'Country of Birth', flex: 1 },
    { field: 'poBirth', headerName: 'PO Birth', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleToggleAccess(params.row.docId)}
            startIcon={params.row.access ? <Unlock /> : <Lock />}
            aria-label={`Toggle access for document ${params.row.docId}`}
          >
            
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => openUrl(params.row.imageUrl)}
            startIcon={<Eye />}
            aria-label="View image"
          >
           
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => openUrl(params.row.filePath)}
            startIcon={<Folder />}
            aria-label="Open folder"
          >
           
          </Button>
        </Box>
      ),
    },
  ];

  // Define the column visibility model
  const columnVisibilityModel: GridColumnVisibilityModel = {
    docId: true,
    source: true,
    aNumber: true,
    cNumber: true,
    firstName: true,
    middleName: false, // Hidden by default
    lastName: true,
    yob: false, // Hidden by default
    mob: false, // Hidden by default
    dob: false, // Hidden by default
    countryOfBirth: false, // Hidden by default
    poBirth: false, // Hidden by default
    actions: true,
  };

  // Map results to rows
  const rows = results.map((result, index) => ({
    id: result.docId || index, // Use docId or index as the unique ID
    ...result,
  }));

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Access toggled successfully"
      />
      {showGrid && ( // Conditionally render the grid
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 25]}
            disableSelectionOnClick
            autoHeight
            columnVisibilityModel={columnVisibilityModel} // Apply the column visibility model
          />
        </Box>
      )}
    </>
  );
};

export default ResultsGrid;