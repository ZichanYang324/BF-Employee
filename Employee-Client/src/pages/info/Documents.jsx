/* eslint react/prop-types: 0 */
import { fetchDocuments } from "../../features/info/infoSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function Documents() {
  const dispatch = useDispatch();
  const documents = useSelector((store) => store.info.documents.data);
  const documentsStatus = useSelector((store) => store.info.documents.status);

  function handleDocumentChange(_event, expanded) {
    if (expanded && documentsStatus === "idle") {
      dispatch(fetchDocuments());
    }
  }

  return (
    <Accordion onChange={handleDocumentChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h4">Documents</Typography>
      </AccordionSummary>

      <AccordionDetails>
        {documentsStatus === "succeeded"
          ? documents.map(([docType, { url }]) => (
              <div key={docType}>
                <a href={url} rel="noreferrer" target="_blank">
                  <Typography>{docType}</Typography>
                </a>
              </div>
            ))
          : "Loading..."}
      </AccordionDetails>
    </Accordion>
  );
}

export default Documents;
