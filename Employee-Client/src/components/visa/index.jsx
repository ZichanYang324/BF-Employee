import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDocumentStatus, uploadDocument } from '../../features/visaStatus/visaStatusSlice';
import DocumentStatus from './DocumentStatus';
import { Container, Typography, CircularProgress, Button, Card, CardContent, Select, MenuItem, FormControl, InputLabel, Snackbar } from '@mui/material';
import DownloadTemplates from './DownloadTemplates';

const VisaStatusManagement = () => {
  const { documents, status, error } = useSelector((state) => state.visaStatus);
  const dispatch = useDispatch();
  const [selectedDocumentType, setSelectedDocumentType] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    dispatch(fetchDocumentStatus());
  }, [dispatch]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && selectedDocumentType) {
      const resultAction = await dispatch(uploadDocument({ file, documentType: selectedDocumentType }));
      if (uploadDocument.fulfilled.match(resultAction)) {
        setSnackbarMessage('Document uploaded successfully');
      } else {
        if (resultAction.payload) {
          setSnackbarMessage(resultAction.payload);
        } else {
          setSnackbarMessage('An unexpected error occurred');
        }
      }
      setOpenSnackbar(true);
    }
  };

  const handleChangeDocumentType = (event) => {
    setSelectedDocumentType(event.target.value);
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const documentTypes = ["OPT Receipt", "OPT EAD", "I-983", "I-20"];

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Visa Status Management
      </Typography>
      {status === 'loading' && <CircularProgress />}
      {status === 'failed' && <Typography color="error">Error: {error}</Typography>}
      {documents.length === 0 && status === 'succeeded' && <Typography>No documents found. Start by uploading your first document.</Typography>}
      
      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel id="document-type-select-label">Document Type</InputLabel>
        <Select
          labelId="document-type-select-label"
          id="document-type-select"
          value={selectedDocumentType}
          label="Document Type"
          onChange={handleChangeDocumentType}
        >
          {documentTypes.map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={snackbarMessage} />

      <Button
        variant="contained"
        component="label"
        disabled={!selectedDocumentType} 
        sx={{ mt: 2 }}
      >
        Upload Document
        <input
          type="file"
          hidden
          onChange={handleFileUpload}
        />
      </Button>

      {documents.map((doc) => (
        <Card key={doc._id} sx={{ mb: 2 }}>
          <CardContent>
            <DocumentStatus document={doc} nextDocumentType="OPT EAD" />
          </CardContent>
        </Card>
      ))}

      <DownloadTemplates />
    </Container>
  );
};

export default VisaStatusManagement;
