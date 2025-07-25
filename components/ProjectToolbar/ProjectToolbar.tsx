"use client";

import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import ProjectForm from "./ProjectForm/ProjectForm";

const ProjectToolbar = () => {
  const [selectHover, setSelectHover] = useState(false);
  const [projectStatus, setProjectStatus] = useState("active");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openForm, setOpenForm] = useState(false);
  const handleStatusChange = (event: SelectChangeEvent) => {
    setProjectStatus(event.target.value);
  };
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box position="relative" mb={0} width="100% ">
      <Box width="95%" m={4} mx="auto" sx={{ background: '#fff',minHeight: '80vh', height: '100%'}}>
        {/* Hàng trên: Tiêu đề và dấu ba chấm */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px={3}
          pt={2}
          pb={2}
        >
          <Typography variant="h5" fontWeight={500} color="#222">
            Manage Projects
          </Typography>
          <IconButton title="More options" onClick={handleMenuOpen}>
            <MoreVertIcon sx={{ color: "#888", fontSize: 28 }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{ style: { minWidth: 160 } }}
          >
            <MenuItem onClick={handleMenuClose}>
              <RefreshIcon sx={{ marginRight: 1 }} />
              Refresh
            </MenuItem>
          </Menu>
        </Box>
        {/* Thanh ngang dưới tiêu đề */}
        <Divider sx={{ mb: 2 }} />
        {/* Toolbar: Nút, dropdown, search */}
        <Box
          display="flex"
          alignItems="center"
          px={3}
          gap={2}
          justifyContent="space-between"
        >
          {/* Nút New Project */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              background: "#f44336",
              color: "#fff",
              borderRadius: "8px",
              padding: "12px 40px",
              fontSize: "16px",
              fontWeight: 500,
              boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
              textTransform: "none",
            }}
            onClick={() => setOpenForm(true)}
          >
            New project
          </Button>

          {/* Dropdown với caret custom */}
          <FormControl
            variant="outlined"
            style={{
              minWidth: "160px",
              width: "200px",
              background: "#fff",
              borderRadius: "8px",
            }}
            size="small"
          >
            <Select
              id="project-status-select"
              value={projectStatus}
              onChange={handleStatusChange}
              onMouseEnter={() => setSelectHover(true)}
              onMouseLeave={() => setSelectHover(false)}
              style={{
                borderRadius: "8px",
                fontSize: "15px",
                background: "#fff",
                height: "50px",
              }}
            >
              <MenuItem value="active">Active Projects</MenuItem>
              <MenuItem value="deactive">Deactive Projects</MenuItem>
              <MenuItem value="archived">All Projects</MenuItem>
            </Select>
          </FormControl>

          {/* Ô tìm kiếm */}
          <TextField
            variant="outlined"
            placeholder="Search by client or project name"
            size="small"
            sx={{
              flex: 1,
              maxWidth: "600px",
              background: "#fff",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                fontSize: "15px",
                height: "50px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#888", fontSize: 22 }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <ProjectForm open={openForm} onClose={() => setOpenForm(false)} />
      </Box>
    </Box>
  );
};

export default ProjectToolbar;
