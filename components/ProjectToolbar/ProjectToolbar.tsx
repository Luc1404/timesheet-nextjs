"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import { projectAPI, customerAPI, ProjectQuantity, userAPI, taskAPI, branchAPI } from "../../services/api";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';


const ProjectToolbar = () => {
  const [projectStatus, setProjectStatus] = useState("active");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openForm, setOpenForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [projectQuantity, setProjectQuantity] = useState<ProjectQuantity | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [actionAnchorEl, setActionAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const handleActionClick = (event: React.MouseEvent<HTMLElement>, projectId: number) => {
    setActionAnchorEl(event.currentTarget);
    setSelectedProjectId(projectId);
  };

  const handleActionClose = () => {
    setActionAnchorEl(null);
    setSelectedProjectId(null);
  };


  const fetchProjects = useCallback(async () => {
    try {
      let status: number | undefined;
      if (projectStatus === "active") status = 0;
      else if (projectStatus === "deactive") status = 1;
      else status = undefined;

      const response = await projectAPI.getAll(status, searchTerm);
      setProjects(response?.result || []);
    } catch (error) {
      setProjects([]);
      console.error("Error fetching projects:", error);
    }
  }, [projectStatus, searchTerm]);


  const fetchCustomers = useCallback(async () => {
    try {
      const response = await customerAPI.getAll();
      setCustomers(response?.result || []);
    } catch (error) {
      setCustomers([]);
      console.error("Error fetching customers:", error);
    }
  }, []);

  const fetchProjectQuantity = useCallback(async () => {
    try {
      const response = await projectAPI.getQuantity();
      if (response && Array.isArray(response.result)) {
        const temp: { [key: string]: number } = {};
        let total = 0;
        response.result.forEach((item: any) => {
          if (item.status === 0) temp.active = item.quantity;
          if (item.status === 1) temp.inactive = item.quantity;
          if (item.status === 3) temp.archived = item.quantity;
          if (item.status === 2) temp.total = item.quantity;
          total += item.quantity || 0;
        });
        const quantityObj: ProjectQuantity = {
          total: temp.total || total,
          active: temp.active || 0,
          inactive: temp.inactive || 0,
        };
        setProjectQuantity(quantityObj);
      } else if (response && response.result) {
        setProjectQuantity(response.result);
      } else {
        setProjectQuantity(null);
      }
    } catch (error) {
      setProjectQuantity(null);
    }
  }, []);

  const fetchFormData = useCallback(async () => {
    try {
      const [customerRes, userRes, taskRes, branchRes] = await Promise.all([
        customerAPI.getAll(),
        userAPI.getAll(),
        taskAPI.getAll(),
        branchAPI.getAll(),
      ]);
      setCustomers(customerRes?.result || []);
      setUsers(userRes?.result || []);
      setTasks(taskRes?.result || []);
      setBranches(branchRes?.result || []);
    } catch (error) {
      setCustomers([]);
      setUsers([]);
      setTasks([]);
      setBranches([]);
      console.error("Error fetching form data:", error);
    }
  }, []);

  // Fetch data on mount and when status/search changes
  useEffect(() => {
    fetchProjects();
    fetchCustomers();
    fetchProjectQuantity();
  }, [fetchProjects, fetchCustomers, fetchProjectQuantity]);

  const handleStatusChange = (event: SelectChangeEvent) => {
    setProjectStatus(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRefresh = () => {
    fetchProjects();
    fetchCustomers();
    fetchProjectQuantity();
    handleMenuClose();
  };

  const handleOpenForm = () => {
    setOpenForm(true);
    fetchFormData();
  };

  // Nhóm projects theo customerName
  const groupedProjects = projects.reduce((acc: { [key: string]: any[] }, project) => {
    const customer = project.customerName || 'Unknown Customer';
    if (!acc[customer]) acc[customer] = [];
    acc[customer].push(project);
    return acc;
  }, {});

  return (
    <Box position="relative" mb={0} width="100% ">
      <Box width="95%" m={4} mx="auto" sx={{ background: '#fff', minHeight: '82vh', height: '100%' }}>
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
            <MenuItem onClick={handleRefresh}>
              <RefreshIcon sx={{ marginRight: 1 }} />
              Refresh
            </MenuItem>
          </Menu>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box
          display="flex"
          alignItems="center"
          px={3}
          gap={2}
          justifyContent="space-between"
        >
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
            onClick={handleOpenForm}
          >
            New project
          </Button>

          <FormControl
            variant="outlined"
            style={{
              minWidth: "160px",
              width: "220px",
              background: "#fff",
              borderRadius: "8px",
            }}
            size="small"
          >
            <Select
              id="project-status-select"
              value={projectStatus}
              onChange={handleStatusChange}
              style={{
                borderRadius: "8px",
                fontSize: "15px",
                background: "#fff",
                height: "50px",
              }}
            >
              <MenuItem value="active">
                Active Projects ({projectQuantity?.active || 0})
              </MenuItem>
              <MenuItem value="deactive">
                Deactive Projects ({projectQuantity?.inactive || 0})
              </MenuItem>
              <MenuItem value="archived">
                All Projects ({projectQuantity?.total || 0})
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            placeholder="Search by client or project name"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
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
        <ProjectForm open={openForm} onClose={() => setOpenForm(false)} customers={customers} users={users} tasks={tasks} branches={branches} />
        <Box mt={6} px={3}>
          {projects.length === 0 ? (
            <Typography color="text.secondary">Không có project nào.</Typography>
          ) : (
            <Box>
              {Object.entries(groupedProjects).map(([customerName, customerProjects]) => (
                <Box key={customerName} mb={3}>
                  <Typography fontWeight={700} fontSize={24} mb={1} px={2}
                    py={1.5}
                    bgcolor="#d1cbcbff" borderRadius={1} color="#524a4aff">
                    {customerName}
                  </Typography>
                  {customerProjects.map((project) => (
                    <Box
                      key={project.id}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      bgcolor="#f5f5f5"
                      borderRadius={2}
                      px={2}
                      py={1.5}
                      mb={1.5}
                    >
                      <Box>
                        {/* Tên project */}
                        {project.name && (
                          <span style={{
                            background: '#2196f3', color: '#fff', borderRadius: 12,
                            padding: '2px 10px', fontSize: 13, fontWeight: 600, marginRight: 4, marginBottom: 4, display: 'inline-block'
                          }}>
                            {project.name}
                          </span>
                        )}
                        {/* Số thành viên */}
                        <span style={{
                          background: '#f44336', color: '#fff', borderRadius: 12,
                          padding: '2px 10px', fontSize: 13, fontWeight: 600, marginRight: 4, marginBottom: 4, display: 'inline-block'
                        }}>
                          {project.activeMember} members
                        </span>
                        {/* Danh sách PM */}
                        {Array.isArray(project.pms) && project.pms.map((pm: string, idx: number) => (
                          <span key={idx} style={{
                            background: '#1976d2', color: '#fff', borderRadius: 12,
                            padding: '2px 10px', fontSize: 13, fontWeight: 600, marginRight: 4, marginBottom: 4, display: 'inline-block'
                          }}>
                            {pm}
                          </span>
                        ))}
                        {/* Code */}
                        <span style={{
                          background: '#ff9800', color: '#fff', borderRadius: 12,
                          padding: '2px 10px', fontSize: 13, fontWeight: 600, marginRight: 4, marginBottom: 4, display: 'inline-block'
                        }}>
                          {project.code}
                        </span>
                        {/* Ngày bắt đầu - kết thúc */}
                        <span style={{
                          background: '#4caf50', color: '#fff', borderRadius: 12,
                          padding: '2px 10px', fontSize: 13, fontWeight: 600, marginRight: 4, marginBottom: 4, display: 'inline-block'
                        }}>
                          {project.timeStart?.slice(0, 10).split('-').reverse().join('/')} - {project.timeEnd?.slice(0, 10).split('-').reverse().join('/')}
                        </span>
                      </Box>
                      {/* Nút Actions */}
                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={<ArrowDropDownIcon />}
                        sx={{
                          minWidth: 100,
                          fontSize: 16,
                          fontWeight: 500,
                          padding: '6px 12px',
                          borderRadius: 2,
                          textTransform: 'none',
                          backgroundColor: '#fff',
                          color: '#000',
                          borderColor: '#dcdcdc',
                          boxShadow: '0px 1px 2px rgba(0,0,0,0.1)',
                          '&:hover': {
                            backgroundColor: '#f5f5f5',
                            borderColor: '#c4c4c4',
                          },
                        }}
                        onClick={(e) => handleActionClick(e, project.id)}
                      >
                        Actions
                      </Button>

                      <Menu
                        anchorEl={actionAnchorEl}
                        open={Boolean(actionAnchorEl) && selectedProjectId === project.id}
                        onClose={handleActionClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        PaperProps={{ style: { borderRadius: 8, minWidth: 100 } }}
                      >
                        <MenuItem onClick={() => console.log('Edit', project.id)}>
                          <EditIcon fontSize="small" sx={{ mr: 1 }} />
                          Edit
                        </MenuItem>
                        <MenuItem onClick={() => console.log('View', project.id)}>
                          <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
                          View
                        </MenuItem>
                        <MenuItem onClick={() => console.log('Delete', project.id)} sx={{ color: 'red' }}>
                          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                          Delete
                        </MenuItem>
                      </Menu>
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectToolbar;
