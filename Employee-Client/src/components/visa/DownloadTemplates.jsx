import React from 'react';
import { Button, Grid } from '@mui/material';

const DownloadTemplates = () => (
  <Grid container spacing={2}>
    <Grid item>
      <Button
        variant="contained"
        component="a"
        href="../../../public/i983_empty.pdf"
        download="Empty I-983 Template"
      >
        Download Empty Template
      </Button>
    </Grid>
    <Grid item>
      <Button
        variant="contained"
        component="a"
        href="../../../public/f1-form-i-983-sample.pdf"
        download="Sample I-983 Template"
      >
        Download Sample Template
      </Button>
    </Grid>
  </Grid>
);

export default DownloadTemplates;
