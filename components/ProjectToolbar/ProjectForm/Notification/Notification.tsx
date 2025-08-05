import React, { useState, useEffect } from "react";
import { Box, Checkbox, FormGroup, TextField, Typography } from "@mui/material";

interface NotificationProps {
  onValidationChange?: (data: {
    komuChannelId: string;
    selectedNotifications: string[];
  }) => void;
  initialData?: {
    komuChannelId: string;
    selectedNotifications: string[];
  };
}

const notificationOptions = [
  "Submit timesheet",
  "Request Off/Remote/Onsite/Đi muộn, về sớm",
  "Approve/Reject Request Off/Remote/Onsite/Đi muộn, về sớm",
  "Request Change Working Time",
  "Approve/Reject Change Working Time",
];

const Notification = ({ onValidationChange, initialData }: NotificationProps) => {
  const [checked, setChecked] = React.useState<string[]>(initialData?.selectedNotifications || []);
  const [komuChannelId, setKomuChannelId] = React.useState(initialData?.komuChannelId || "");

  const handleChange = (label: string) => {
    setChecked((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  // Update parent validation whenever notification data changes
  useEffect(() => {
    if (onValidationChange) {
      onValidationChange({
        komuChannelId: komuChannelId,
        selectedNotifications: checked,
      });
    }
  }, [komuChannelId, checked, onValidationChange]);

  // Cập nhật state khi initialData thay đổi
  useEffect(() => {
    if (initialData) {
      setKomuChannelId(initialData.komuChannelId || "");
      setChecked(initialData.selectedNotifications || []);
    }
  }, [initialData]);

  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 2 }}>
      <TextField
        fullWidth
        variant="standard"
        placeholder="Komu Channel Id"
        value={komuChannelId}
        onChange={(e) => setKomuChannelId(e.target.value)}
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
