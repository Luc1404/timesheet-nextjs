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
import ClientTab from "../General/Client/Client";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


interface Customer {
  id: string | number;
  name: string;
}

interface GeneralProps {
  customers: Customer[];
}

const schema = yup.object().shape({
  client: yup.string().required("Project customer is required!"),
  projectName: yup.string().required("Project name is required!"),
  projectCode: yup.string().required("Project code is required!"),
});


const General = ({ customers = [] }: GeneralProps) => {
  const [client, setClient] = useState("");
  const [startAt, setStartAt] = useState<dayjs.Dayjs | null>(null);
  const [endAt, setEndAt] = useState<dayjs.Dayjs | null>(null);
  const [note, setNote] = useState("");
  const [allUser, setAllUser] = useState(false);
  const [projectType, setProjectType] = useState("");
  const [openClientModal, setOpenClientModal] = useState(false);
  const handleOpenClient = () => {
    setOpenClientModal(true);
  };
  const handleCloseClient = () => {
    setOpenClientModal(false);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 2 }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "70%" },
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            fontWeight="bold"
            fontSize={15}
            sx={{
              whiteSpace: "nowrap",
              mr: 2,
              minWidth: "130px",
            }}
          >
            Client <span style={{ color: "#f44336" }}>*</span>
          </Typography>
          <Controller
            name="client"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.client} required>
                <Select
                  {...field}
                  displayEmpty
                  onChange={(e) => field.onChange(e.target.value)}
                  onBlur={field.onBlur}
                  value={field.value || ""}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 300,
                        maxWidth: 400,
                        width: "100%",
                        overflowY: "auto",
                      },
                    },
                  }}
                >
                  <MenuItem value="">Choose a client...</MenuItem>
                  {customers.map((customer) => (
                    <MenuItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </MenuItem>
                  ))}
                </Select>
                {/* ✅ Hiển thị lỗi */}
                {errors.client && (
                  <Typography fontSize={16} variant="caption" color="#f44336" mt={0.5}>
                    {errors.client.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
        </Box>
        <Box
          sx={{
            alignSelf: "center",
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenClient}
            sx={{
              height: 50,
              width: 160,
              bgcolor: "#f44336",
              textTransform: "none",
            }}
          >
            New Client
          </Button>
        </Box>
      </Stack>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, width: "80%" }}>
        <Typography
          fontWeight="bold"
          fontSize={15}
          sx={{
            whiteSpace: "nowrap",
            mr: 2,
            minWidth: "130px",
          }}
        >
          Project Name <span style={{ color: "#f44336" }}>*</span>
        </Typography>
        <Controller
          name="projectName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Project Name"
              fullWidth
              error={!!errors.projectName}
              helperText={
                errors.projectName?.message && (
                  <Typography fontSize={16} color="#f44336">
                    {errors.projectName.message}
                  </Typography>
                )
              }
            />
          )}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, width: "80%" }}>
        <Typography fontWeight="bold" fontSize={15} sx={{
          whiteSpace: "nowrap",
          mr: 2,
          minWidth: "130px",
        }}>
          Project Code <span style={{ color: "#f44336" }}>*</span>
        </Typography>
        <Controller
          name="projectCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Project Code"
              fullWidth
              error={!!errors.projectCode}
             helperText={
                errors.projectName?.message && (
                  <Typography fontSize={16} color="#f44336">
                    {errors.projectName.message}
                  </Typography>
                )
              }
            />
          )}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          fontWeight="bold"
          fontSize={15}
          sx={{
            whiteSpace: "nowrap",
            minWidth: "130px",
            mr: 2,
          }}
        >
          Dates <span style={{ color: "#f44336" }}>*</span>
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          sx={{ flex: 1 }}
        >
          <DatePicker
            value={startAt}
            onChange={(newValue) => setStartAt(newValue)}
            slotProps={{
              textField: {
                fullWidth: true,
                label: "Start at",
                sx: { width: 400 },
              },
            }}
          />
          <Typography>to</Typography>
          <DatePicker
            value={endAt}
            onChange={(newValue) => setEndAt(newValue)}
            slotProps={{
              textField: {
                fullWidth: true,
                label: "End at",
                sx: { width: 400 },
              },
            }}
          />
        </Stack>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          fontWeight="bold"
          fontSize={15}
          sx={{
            whiteSpace: "nowrap",
            minWidth: "130px",
            mr: 2,
          }}
        >
          Note
        </Typography>

        <TextareaAutosize
          minRows={2}
          style={{
            flex: 1,
            fontSize: "16px",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            resize: "vertical",
            boxSizing: "border-box",
            width: "100%",
          }}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          fontWeight="bold"
          fontSize={15}
          sx={{
            whiteSpace: "nowrap",
            minWidth: "130px",
            mr: 2,
          }}
        >
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
          sx={{ flex: 1 }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <Typography
          fontWeight="bold"
          fontSize={15}
          sx={{
            whiteSpace: "nowrap",
            minWidth: "130px",
            mr: 2,
            mt: 1,
          }}
        >
          Project Type <span style={{ color: "#f44336" }}>*</span>
        </Typography>
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {["T&M", "Fixed Frice", "Non-Bill", "ODC"].map((type) => (
              <Button
                key={type}
                variant={projectType === type ? "contained" : "outlined"}
                onClick={() => setProjectType(type)}
                sx={{
                  minWidth: 220,
                  height: 60,
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

          <Stack direction="row" spacing={2} sx={{ mt: 2 }} flexWrap="wrap">
            {["Product", "Training", "NoSalary"].map((type) => (
              <Button
                key={type}
                variant={projectType === type ? "contained" : "outlined"}
                onClick={() => setProjectType(type)}
                sx={{
                  minWidth: 220,
                  height: 60,
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
      <Dialog open={openClientModal} onClose={handleCloseClient}>
        <DialogContent>
          <ClientTab onClose={handleCloseClient} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default General;
