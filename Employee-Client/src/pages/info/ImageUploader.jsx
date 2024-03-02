// Inspired by Christol's `onboard.jsx`
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, InputLabel, styled } from "@mui/material";
import { useMemo } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function ImageUploader({ value, sx, label, inputProps }) {
  const displayUrl = useMemo(
    () => (typeof value === "string" ? value : URL.createObjectURL(value[0])),
    [value],
  );
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 4, ...sx }}>
      <img
        src={displayUrl}
        width="80px"
        height="80px"
        style={{ borderRadius: "50%" }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <InputLabel>{label}</InputLabel>
        <Button
          component="label"
          variant="contained"
          sx={{ mt: 2 }}
          startIcon={<CloudUploadIcon />}
          role={undefined}
        >
          Upload
          <VisuallyHiddenInput type="file" {...inputProps} />
        </Button>
      </Box>
    </Box>
  );
}

export default ImageUploader;
