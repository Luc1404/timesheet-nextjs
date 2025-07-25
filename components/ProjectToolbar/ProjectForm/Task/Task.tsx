import React from "react";
import {
  Box,
  Checkbox,
  Grid,
  Typography
} from "@mui/material";

const TasksTab: React.FC = () => {
  return (
    <Box p={2}>
      {/* Header Row */}
      <Grid
        container
        sx={{
          backgroundColor: "#f5f5f5",
          transition: "background-color 0.3s",
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
          px: 2        
        }}
        alignItems="center"
      >
        {/* Tasks Title */}
        <Grid item xs={6} width="50%">
          <Box display="flex" alignItems="center" height="100%">
            <Typography fontWeight="bold">Tasks</Typography>
          </Box>
        </Grid>

        {/* Billable Section */}
        <Grid item xs={6} width="50%">
          <Box display="flex" flexDirection="column" alignItems="start" height="100%">
            <Typography fontWeight="bold">Billable</Typography>
            <Checkbox />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TasksTab;
