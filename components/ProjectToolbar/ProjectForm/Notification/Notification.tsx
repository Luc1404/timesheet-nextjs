import React from "react";
import { Box, Checkbox, FormGroup, TextField, Typography } from "@mui/material";

const notificationOptions = [
  "Submit timesheet",
  "Request Off/Remote/Onsite/Đi muộn, về sớm",
  "Approve/Reject Request Off/Remote/Onsite/Đi muộn, về sớm",
  "Request Change Working Time",
  "Approve/Reject Change Working Time",
];

const Notification = () => {
  const [checked, setChecked] = React.useState<string[]>([]);

  const handleChange = (label: string) => {
    setChecked((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 2 }}>
      <TextField
        fullWidth
        variant="standard"
        placeholder="Komu Channel Id"
        sx={{
          mb: 2,
          "& .MuiInput-underline:hover:before": {
            borderBottomColor: "#f44336",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#f44336",
          },
        }}
      />
      <FormGroup>
        {notificationOptions.map((label) => (
          <Box key={label} display="flex" alignItems="center" >
            <Checkbox
              checked={checked.includes(label)}
              onChange={() => handleChange(label)}
              sx={{ "&.Mui-checked": { color: "#f44336" } }}
            />
            <Typography
              variant="body1"
              sx={{ color: "#8B0000", fontWeight: 600 }}
            >
              {label}
            </Typography>
          </Box>
        ))}
      </FormGroup>
    </Box>
  );
};

export default Notification;
