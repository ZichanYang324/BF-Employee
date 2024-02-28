import { TextField } from "@mui/material";
import styled from "styled-components";

export const StyledTextField = styled(TextField)`
  input[value=""]:not(:focus) {
    color: transparent;
  }
`;
