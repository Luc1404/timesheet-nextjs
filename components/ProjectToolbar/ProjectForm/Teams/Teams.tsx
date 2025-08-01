import React, { useState } from "react";
import {
    Box,
    Typography,
    Checkbox,
    FormControlLabel,
    TextField,
    InputAdornment,
    Button,
    Collapse,
    FormControl,
    Select,
    MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface User {
    name: string;
    email: string;
    branch: string;
    type: string;
}

interface Branch {
    id: string;
    name: string;
}

const Teams: React.FC<{ users?: User[]; branches?: Branch[] }> = ({ users = [], branches = [] }) => {
    const [open, setOpen] = useState(false);
    const [showRightPanel, setShowRightPanel] = useState(false);
    const [branchFilter, setBranchFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const toggleOpen = () => setOpen(!open);

    // Lọc user theo filter + search
    const filteredUsers = users.filter(user => {
        const matchBranch = branchFilter === "all" || user.branch === branchFilter;
        const matchType = typeFilter === "all" || user.type.toLowerCase() === typeFilter.toLowerCase();
        const matchSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchBranch && matchType && matchSearch;
    });

    return (
        <Box display="flex" width="100%" sx={{
            height: "60vh", 
            minHeight: 0,    
            overflow: "hidden"        
        }} >
            {/* Left panel */}
            <Box
                sx={{
                    p: "16px",
                    width: showRightPanel ? "50%" : "100%",
                    transition: "width 0.3s",
                }}
            >
                {/* Header toggle */}
                <Box
                    onClick={toggleOpen}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ cursor: "pointer" }}
                >
                    <Typography fontWeight={600} fontSize={16}>Selected member</Typography>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </Box>

                <Collapse in={open}>
                    <Box mt={2}>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <FormControlLabel
                                control={<Checkbox sx={{ '&.Mui-checked': { color: '#f44336' } }} />}
                                label="Show deactivate member"
                            />
                            <FormControlLabel
                                control={<Checkbox sx={{ '&.Mui-checked': { color: '#f44336' } }} />}
                                label="Show Inactive user"
                            />
                        </Box>

                        <TextField
                            variant="standard"
                            fullWidth
                            placeholder="Search by name, email"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                mt: 2,
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: '#f44336',
                                },
                            }}
                        />

                        <Box display="flex" justifyContent="flex-end" mt={2}>
                            <Button
                                variant="contained"
                                sx={{ textTransform: 'none', bgcolor: "#f44336" }}
                                onClick={() => setShowRightPanel(!showRightPanel)}
                            >
                                {showRightPanel ? "Exit add" : "Add users"}
                            </Button>
                        </Box>

                    </Box>
                </Collapse>
            </Box>

            {/* Right panel (select user) */}
            {showRightPanel && (
                <Box
                    sx={{
                        width: "50%",
                        borderLeft: "1px solid #ddd",
                        p: 2,
                        backgroundColor: "#fafafa",
                        overflowY: "auto",
                        maxHeight: '100vh',
                    }}
                >
                    {/* Filters */}
                    <Box display="flex" gap={2} mt={2}>
                        <FormControl sx={{ minWidth: 120 }}>
                            <Select
                                value={branchFilter}
                                onChange={(e) => setBranchFilter(e.target.value)}
                                displayEmpty
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            maxHeight: 200,
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="all"> Branch</MenuItem>
                                {branches.map((branch) => (
                                    <MenuItem key={branch.id} value={branch.name}>
                                        {branch.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ minWidth: 120 }}>
                            <Select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                            >
                                <MenuItem value="all">All Types</MenuItem>
                                <MenuItem value="Staff">Staff</MenuItem>
                                <MenuItem value="Internship">Internship</MenuItem>
                                <MenuItem value="Collaborator">Collaborator</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            variant="standard"
                            placeholder="Search by name, email"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    {/* User list */}
                    <Box mt={2}>
                        {filteredUsers.length === 0 ? (
                            <Typography variant="body2" color="text.secondary">No users found.</Typography>
                        ) : (
                            filteredUsers.map((user, index) => (
                                <Box
                                    key={index}
                                    p={1}
                                    mb={1}
                                    sx={{
                                        border: "1px solid #e0e0e0",
                                        borderRadius: 1,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box>
                                        <Typography fontWeight={600}>{user.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                                    </Box>
                                    <Box display="flex" gap={1}>
                                        <Box
                                            px={1}
                                            py={0.5}
                                            borderRadius="4px"
                                            fontSize="12px"
                                            bgcolor={user.branch === "SG1" ? "#2196f3" : "#f44336"}
                                            color="#fff"
                                        >
                                            {user.branch}
                                        </Box>
                                        <Box
                                            px={1}
                                            py={0.5}
                                            borderRadius="4px"
                                            fontSize="12px"
                                            bgcolor={user.type === "Staff" ? "#f44336" : "#2196f3"}
                                            color="#fff"
                                        >
                                            {user.type}
                                        </Box>
                                    </Box>
                                </Box>
                            ))
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default Teams;
