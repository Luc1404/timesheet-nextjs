import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import dayjs from "dayjs";
import TextareaAutosize from "@mui/material/TextareaAutosize";

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
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 2 }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="flex-start"
      >
        <Box sx={{ flex: 1, }}>
          <Typography fontWeight="bold" fontSize={15} mb={0.5}>
            Client <span style={{ color: "#f44336" }}>*</span>
          </Typography>
          <FormControl fullWidth required>
            <Select
              value={client}
              onChange={(e) => setClient(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">Choose a client...</MenuItem>
              {/* Thêm các MenuItem client ở đây */}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Typography fontWeight={500} fontSize={15} mb={0.5}>
            &nbsp;
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ height: 56, bgcolor: "#f44336" }}
          >
            New Client
          </Button>
        </Box>
      </Stack>
      <Box>
        <Typography fontWeight="bold" fontSize={15} mb={0.5}>
          Project Name <span style={{ color: "#f44336" }}>*</span>
        </Typography>
        <TextField
          placeholder="Project Name"
          required
          fullWidth
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </Box>
      <Box>
        <Typography fontWeight="bold" fontSize={15} mb={0.5}>
          Project Code <span style={{ color: "#f44336" }}>*</span>
        </Typography>
        <TextField
          placeholder="Project Code"
          required
          fullWidth
          value={projectCode}
          onChange={(e) => setProjectCode(e.target.value)}
        />
      </Box>
      <Box>
        <Typography fontWeight="bold" fontSize={15} mb={0.5}>
          Dates<span style={{ color: "#f44336" }}>*</span>
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
        >
          <DatePicker
            value={startAt}
            onChange={(newValue) => setStartAt(newValue)}
            sx={{ width: "100%" }}
            slotProps={{
              textField: {
                fullWidth: true,
                label: "Start at",
              },
            }}
          />
          <Typography sx={{ mx: 1 }}>to</Typography>
          <DatePicker
            value={endAt}
            onChange={(newValue) => setEndAt(newValue)}
            sx={{ width: "100%" }}
            slotProps={{ textField: { fullWidth: true, label: "End at" } }}
          />
        </Stack>
      </Box>
      <Box>
        <Typography fontWeight="bold" fontSize={15} mb={0.5}>
          Note
        </Typography>
        <TextareaAutosize
          minRows={2}
          style={{
            width: "100%",
            fontSize: "16px",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            resize: "vertical",
            boxSizing: "border-box",
          }}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </Box>
      <Box>
        <Typography fontWeight="bold" fontSize={15} mb={0.5}>
          All User
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={allUser}
              onChange={(e) => setAllUser(e.target.checked)}
            />
          }
          label="Auto add user as a member of this project when creating new user"
        />
      </Box>
      <Box>
        <Typography fontWeight="bold" fontSize={15} mb={0.5}>
          Project Type <span style={{ color: "#f44336" }}>*</span>
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Stack direction="row" spacing={2}>
            {["T&M", "Fixed Frice", "Non-Bill", "ODC"].map((type) => (
              <Button
                key={type}
                variant={projectType === type ? "contained" : "outlined"}
                onClick={() => setProjectType(type)}
                sx={{
                  minWidth: 180,
                  height: 56,
                  bgcolor: projectType === type ? "#f57c00" : "#fff",
                  color: projectType === type ? "#fff" : "#222",
                  fontWeight: 700,
                  fontSize: 18,
                  borderRadius: 2,
                  borderColor: "#ccc",
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: projectType === type ? "#ef6c00" : "#f5f5f5",
                    boxShadow: "none",
                  },
                }}
              >
                {type}
              </Button>
            ))}
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            {["Product", "Training", "NoSalary"].map((type) => (
              <Button
                key={type}
                variant={projectType === type ? "contained" : "outlined"}
                onClick={() => setProjectType(type)}
                sx={{
                  minWidth: 180,
                  height: 56,
                  bgcolor: projectType === type ? "#f57c00" : "#fff",
                  color: projectType === type ? "#fff" : "#222",
                  fontWeight: 700,
                  fontSize: 18,
                  borderRadius: 2,
                  borderColor: "#ccc",
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: projectType === type ? "#ef6c00" : "#f5f5f5",
                    boxShadow: "none",
                  },
                }}
              >
                {type}
              </Button>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default General;
