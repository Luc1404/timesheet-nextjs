import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import General from "./General/General";

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ open, onClose }) => {
  const [tab, setTab] = React.useState(0);
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) =>
    setTab(newValue);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth sx={{
    "& .MuiDialog-paper": {
      minHeight: "650px", 
    },
  }}>
      <DialogTitle
        sx={{
          fontWeight: 600,
          fontSize: 28,
          pb: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Create Project
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider sx={{ mt: 2, mx: 3 }} />
      <DialogContent sx={{ pt: 0 }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
            },
            "& .Mui-selected": {
              color: "#f44336 !important",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#f44336",
            },
          }}
        >
          <Tab label="General" />
          <Tab label="Team" />
          <Tab label="Tasks" />
          <Tab label="Notification" />
        </Tabs>
        <Divider />
         {tab === 0 && <General />}
      </DialogContent>
       <Divider sx={{ mx: 3 }} />
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            textTransform: "none",
            color: "#6e6e6e",
            borderColor: "#6e6e6e",
            "&:hover": {
              borderColor: "#6e6e6e",
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          Cancel
        </Button>
        <Button variant="contained" sx={{ bgcolor: "#f44336", textTransform: "none" }} >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectForm;
