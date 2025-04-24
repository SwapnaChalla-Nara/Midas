import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams, GridColumnVisibilityModel } from '@mui/x-data-grid';
import { Button, Box, Snackbar, Modal, Typography, IconButton } from '@mui/material';
import { Eye, Folder, Lock, Unlock, ZoomIn, ZoomOut, RotateCw , X } from 'lucide-react';

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
  showGrid: boolean; // Prop to control grid visibility
}

const ResultsGrid: React.FC<ResultsGridProps> = ({ results, onToggleAccess, showGrid }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1); // State for zoom level
  const [rotation, setRotation] = useState(0); // State for rotation angle

  const handleToggleAccess = (docId: string) => {
    onToggleAccess(docId);
    setSnackbarOpen(true);
  };

  const handleOpenModal = (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
    setZoom(1); // Reset zoom
    setRotation(0); // Reset rotation
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalContent(null);
    setModalTitle(null);
  };

  const handleZoomIn = () => setZoom((prev) => prev + 0.1);
  const handleZoomOut = () => setZoom((prev) => Math.max(0.1, prev - 0.1));
  const handleRotate = () => setRotation((prev) => prev + 90);

  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    { field: 'docId', headerName: 'Doc ID', flex: 1 },
    { field: 'source', headerName: 'Source', flex: 1 },
    { field: 'aNumber', headerName: 'A Number', flex: 1 },
    { field: 'cNumber', headerName: 'C Number', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
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
            onClick={() => handleOpenModal('View Image', params.row.imageUrl)}
            startIcon={<Eye />}
            aria-label="View image"
          >
            
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleOpenModal('Folder Path', params.row.filePath)}
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
    lastName: true,
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
      {showGrid && (
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 25]}
            disableSelectionOnClick
            autoHeight
            columnVisibilityModel={columnVisibilityModel}
          />
        </Box>
      )}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          className="relative bg-white rounded-lg shadow-lg p-6"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '800px', // Larger modal size
            height: '90%', // Larger height
            overflow: 'hidden',
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6" component="h2">
              {modalTitle}
            </Typography>
            <IconButton onClick={handleCloseModal} aria-label="Close modal">
              <X />
            </IconButton>
          </div>
          {modalTitle === 'View Image' ? (
            <div className="flex flex-col items-center">
              <div
                className="overflow-hidden flex justify-center items-center"
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`,
                  transition: 'transform 0.3s ease',
                  maxHeight: '70%', // Prevent image from blocking buttons
                }}
              >
                <img
                  src={modalContent || ''}
                  alt="Modal Content"
                  className="max-w-full max-h-full"
                />
              </div>
              <div className="flex justify-center mt-4 space-x-4">
                <IconButton
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  onClick={handleZoomIn}
                  aria-label="Zoom In"
                >
                  <ZoomIn />
                </IconButton>
                <IconButton
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  onClick={handleZoomOut}
                  aria-label="Zoom Out"
                >
                  <ZoomOut />
                </IconButton>
                <IconButton
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  onClick={handleRotate}
                  aria-label="Rotate"
                >
                  <RotateCw />
                </IconButton>
              </div>
            </div>
          ) : (
            <Typography variant="body1">{modalContent}</Typography>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ResultsGrid;