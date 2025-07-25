import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import dayjs from "dayjs";

const General = () => {
  const [client, setClient] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [startAt, setStartAt] = useState<dayjs.Dayjs | null>(null);
  const [endAt, setEndAt] = useState<dayjs.Dayjs | null>(null);
  const [note, setNote] = useState("");
  const [allUser, setAllUser] = useState(false);
  const [projectType, setProjectType] = useState("");

  return (
    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="flex-start">
        <Box sx={{ flex: 1 }}>
          <Typography fontWeight={500} fontSize={15} mb={0.5}>
            Client<span style={{ color: "#f44336" }}>*</span>
          </Typography>
          <FormControl fullWidth required>
            <InputLabel>Client</InputLabel>
            <Select label="Client" value={client} onChange={e => setClient(e.target.value)}>
              <MenuItem value="">Choose a client...</MenuItem>
              {/* Thêm các MenuItem client ở đây */}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <Typography fontWeight={500} fontSize={15} mb={0.5}>&nbsp;</Typography>
          <Button variant="contained" startIcon={<AddIcon />} sx={{ height: 56, bgcolor: "#f44336" }}>
            New Client
          </Button>
        </Box>
      </Stack>
      <Box>
        <Typography fontWeight={500} fontSize={15} mb={0.5}>
          Project Name<span style={{ color: "#f44336" }}>*</span>
        </Typography>
        <TextField label="Project Name" required fullWidth value={projectName} onChange={e => setProjectName(e.target.value)} />
      </Box>
      <Box>
        <Typography fontWeight={500} fontSize={15} mb={0.5}>
          Project Code<span style={{ color: "#f44336" }}>*</span>
        </Typography>
        <TextField label="Project Code" required fullWidth value={projectCode} onChange={e => setProjectCode(e.target.value)} />
      </Box>
      <Box>
        <Typography fontWeight={500} fontSize={15} mb={0.5}>
          Dates<span style={{ color: "#f44336" }}>*</span>
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
          <DatePicker 
            label="Start at" 
            value={startAt} 
            onChange={(newValue) => setStartAt(newValue)} 
            sx={{ width: "100%" }} 
            slotProps={{ textField: { fullWidth: true } }} 
          />
          <Typography sx={{ mx: 1 }}>to</Typography>
          <DatePicker 
            label="End at" 
            value={endAt} 
            onChange={(newValue) => setEndAt(newValue)} 
            sx={{ width: "100%" }} 
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Stack>
      </Box>
      <Box>
        <Typography fontWeight={500} fontSize={15} mb={0.5}>Note</Typography>
        <TextField label="Note" fullWidth multiline minRows={2} value={note} onChange={e => setNote(e.target.value)} />
      </Box>
      <Box>
        <Typography fontWeight={500} fontSize={15} mb={0.5}>All User</Typography>
        <FormControlLabel control={<Checkbox checked={allUser} onChange={e => setAllUser(e.target.checked)} />} label="Auto add user as a member of this project when creating new user" />
      </Box>
      <Box>
        <Typography fontWeight={500} fontSize={15} mb={0.5}>
          Project Type<span style={{ color: "#f44336" }}>*</span>
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField label="Project Type" required fullWidth value={projectType} onChange={e => setProjectType(e.target.value)} />
          <Box sx={{ flex: 1 }} />
          <Box sx={{ flex: 1 }} />
        </Stack>
      </Box>
    </Box>
  );
};

export default General;
