import React, { useState, useEffect } from "react";
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
    IconButton,
    InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import { User, Branch } from "../../../../types";

interface TeamsProps {
    users?: User[];
    branches?: Branch[];
    onValidationChange?: (selectedMembers: User[]) => void;
    initialData?: {
        selectedMembers: User[];
    };
}

const Teams: React.FC<TeamsProps> = ({
    users = [],
    branches = [],
    onValidationChange,
    initialData,
}) => {
    const [open, setOpen] = useState(false);
    const [showRightPanel, setShowRightPanel] = useState(false);
    const [branchFilter, setBranchFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMembersSearchTerm, setSelectedMembersSearchTerm] = useState("");
    const [selectedMembers, setSelectedMembers] = useState<User[]>(initialData?.selectedMembers || []);
    const [selectedMemberRoles, setSelectedMemberRoles] = useState<{ [key: string]: { role: string, status: string } }>({});

    const toggleOpen = () => setOpen(!open);

    // Update parent validation whenever selectedMembers changes
    useEffect(() => {
        if (onValidationChange) {
            onValidationChange(selectedMembers);
        }
    }, [selectedMembers, onValidationChange]);

    // Cập nhật selectedMembers khi initialData thay đổi
    useEffect(() => {
        if (initialData?.selectedMembers) {
            setSelectedMembers(initialData.selectedMembers);
        }
    }, [initialData]);

    // Cập nhật selectedMemberRoles khi selectedMembers thay đổi
    useEffect(() => {
        const newRoles: { [key: string]: { role: string, status: string } } = {};
        selectedMembers.forEach((member, index) => {
            const memberKey = member.id || member.name;
            newRoles[memberKey] = { 
                role: index === 0 ? "PM" : "Member", 
                status: "Official" 
            };
        });
        setSelectedMemberRoles(newRoles);
    }, [selectedMembers]);

    // Helper function to get type display name
    const getTypeDisplayName = (type: number | string | undefined): string => {
        if (typeof type === "number") {
            switch (type) {
                case 0:
                    return "Staff";
                case 1:
                    return "Internship";
                case 2:
                    return "Collaborator";
                default:
                    return "Unknown";
            }
        }
        return type?.toString() || "Unknown";
    };

    // Helper function to get type number from display name
    const getTypeNumber = (displayName: string): number | null => {
        switch (displayName.toLowerCase()) {
            case "staff":
                return 0;
            case "internship":
                return 1;
            case "collaborator":
                return 2;
            default:
                return null;
        }
    };

    // Add member to selected list
    const addMember = (user: User) => {
        if (!selectedMembers.find(member => member.id === user.id)) {
            const isFirstMember = selectedMembers.length === 0;
            const newRole = isFirstMember ? "PM" : "Member";
            
            setSelectedMembers([...selectedMembers, user]);
            setSelectedMemberRoles(prev => ({
                ...prev,
                [user.id || user.name]: { role: newRole, status: "Official" }
            }));
        }
    };

    // Remove member from selected list
    const removeMember = (userId: string | number | undefined) => {
        setSelectedMembers(selectedMembers.filter(member => member.id !== userId));
        setSelectedMemberRoles(prev => {
            const newRoles = { ...prev };
            delete newRoles[userId || ''];
            return newRoles;
        });
    };

    // Update member role or status
    const updateMemberRole = (userId: string | number | undefined, field: 'role' | 'status', value: string) => {
        setSelectedMemberRoles(prev => ({
            ...prev,
            [userId || '']: {
                ...prev[userId || ''],
                [field]: value
            }
        }));
    };

    // Lọc user theo filter + search và loại bỏ những user đã được chọn
    const filteredUsers = users.filter((user) => {
        // Loại bỏ những user đã được chọn
        const isAlreadySelected = selectedMembers.find(member => member.id === user.id);
        if (isAlreadySelected) {
            return false;
        }

        // Lọc theo branch - xử lý case-insensitive và nhiều trường hợp
        let matchBranch = true;
        if (branchFilter !== "all") {
            const userBranchValue = user.branchDisplayName || user.branch;
            const userBranch = typeof userBranchValue === 'string' ? userBranchValue.toLowerCase() : '';
            const filterBranch = branchFilter.toLowerCase();
            matchBranch = userBranch === filterBranch;
        }

        // Lọc theo type (sử dụng số hoặc string)
        let matchType = true;
        if (typeFilter !== "all") {
            const targetTypeNumber = getTypeNumber(typeFilter);
            if (targetTypeNumber !== null) {
                matchType = user.type === targetTypeNumber;
            } else {
                matchType = user.type === typeFilter;
            }
        }

        const matchSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.emailAddress &&
                typeof user.emailAddress === "string" &&
                user.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchBranch && matchType && matchSearch;
    });

    // Filter selected members by search term
    const filteredSelectedMembers = selectedMembers.filter((member) => {
        const matchSearch = selectedMembersSearchTerm === "" || 
            member.name.toLowerCase().includes(selectedMembersSearchTerm.toLowerCase()) ||
            (member.emailAddress &&
                typeof member.emailAddress === "string" &&
                member.emailAddress.toLowerCase().includes(selectedMembersSearchTerm.toLowerCase()));
        return matchSearch;
    });

    return (
        <Box
            display="flex"
            width="100%"
            sx={{
                height: "60vh",
                minHeight: 0,
                overflow: "hidden",
            }}
        >
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
                    <Typography fontWeight={600} fontSize={16}>
                        Selected member
                    </Typography>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </Box>

                <Collapse in={open}>
                    <Box mt={2}>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{ "&.Mui-checked": { color: "#f44336" } }} />
                                }
                                label="Show deactivate member"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{ "&.Mui-checked": { color: "#f44336" } }} />
                                }
                                label="Show Inactive user"
                            />
                        </Box>

                        <TextField
                            variant="standard"
                            fullWidth
                            placeholder="Search selected members by name, email"
                            value={selectedMembersSearchTerm}
                            onChange={(e) => setSelectedMembersSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                mt: 2,
                                "& .MuiInput-underline:after": {
                                    borderBottomColor: "#f44336",
                                },
                            }}
                        />

                        <Box display="flex" justifyContent="flex-end" mt={2}>
                            <Button
                                variant="contained"
                                sx={{ textTransform: "none", bgcolor: "#f44336" }}
                                onClick={() => setShowRightPanel(!showRightPanel)}
                            >
                                {showRightPanel ? "Exit add" : "Add users"}
                            </Button>
                        </Box>

                        {/* Selected members list */}
                        <Box mt={2} sx={{
                            height: "170px", // Cố định chiều cao để có thể scroll
                            overflowY: "auto",
                            overflowX: "hidden",
                            border: "1px solid #e0e0e0",
                            borderRadius: "4px",
                            padding: "6px",
                            "&::-webkit-scrollbar": {
                                width: "8px",
                            },
                            "&::-webkit-scrollbar-track": {
                                background: "#f1f1f1",
                                borderRadius: "4px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                background: "#c1c1c1",
                                borderRadius: "4px",
                                "&:hover": {
                                    background: "#a8a8a8",
                                },
                            },
                        }}>
                            {filteredSelectedMembers.map((member, index) => {
                                const memberRoles = selectedMemberRoles[member.id || member.name] || { role: "PM", status: "Official" };
                                const typeDisplayName = getTypeDisplayName(member.type);
                                const isStaff = member.type === 0;
                                const isInternship = member.type === 1;

                                return (
                                    <Box
                                        key={member.id || index}
                                        p={1.5}
                                        mb={1}
                                        sx={{
                                            border: "1px solid #e0e0e0",
                                            borderRadius: 1,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1.5,
                                            backgroundColor: "white",
                                            position: "relative",
                                            cursor: "pointer",
                                            "&:hover": {
                                                backgroundColor: "#f0f0f0",
                                            },
                                        }}
                                    >
                                        {/* Remove button */}
                                        <IconButton
                                            size="small"
                                            onClick={() => removeMember(member.id)}
                                            sx={{
                                                color: "#f44336",
                                            }}
                                        >
                                            <CloseIcon fontSize="small" />
                                        </IconButton>

                                        {/* Member status with icon */}
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Typography
                                                variant="body2"
                                                color="text.primary"
                                                fontSize="14px"
                                            >
                                                Member
                                            </Typography>
                                        </Box>

                                        {/* User info */}
                                        <Box flex={1}>
                                            <Typography fontWeight={600} fontSize="14px">
                                                {member.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                fontSize="12px"
                                            >
                                                {member.emailAddress || member.email}
                                            </Typography>
                                            {/* Branch and Type labels */}
                                            <Box display="flex" gap={0.5} mt={0.5}>
                                                <Box
                                                    px={0.5}
                                                    py={0.1}
                                                    borderRadius="4px"
                                                    fontSize="12px"
                                                    bgcolor={
                                                        (member.branchDisplayName || member.branch) === "HN1"
                                                            ? "#1976d2"
                                                            : (member.branchDisplayName || member.branch) === "HN2"
                                                                ? "#388e3c"
                                                                : (member.branchDisplayName || member.branch) === "SG1"
                                                                    ? "#f57c00"
                                                                    : (member.branchDisplayName || member.branch) === "SG2"
                                                                        ? "#7b1fa2"
                                                                        : (member.branchDisplayName || member.branch) === "ĐN"
                                                                            ? "#455a64"
                                                                            : (member.branchDisplayName || member.branch) === "Vinh"
                                                                                ? "#5d4037"
                                                                                : (member.branchDisplayName || member.branch) === "QN"
                                                                                    ? "#c2185b"
                                                                                    : (member.branchDisplayName || member.branch) === "HN3"
                                                                                        ? "#0097a7"
                                                                                        : "#d32f2f"
                                                    }
                                                    color="#fff"
                                                    sx={{ fontWeight: 500 }}
                                                >
                                                    {member.branchDisplayName || member.branch || ''}
                                                </Box>
                                                <Box
                                                    px={0.5}
                                                    py={0.1}
                                                    borderRadius="4px"
                                                    fontSize="12px"
                                                    bgcolor={
                                                        isStaff
                                                            ? "#f44336"
                                                            : isInternship
                                                                ? "#4caf50"
                                                                : "#2196f3"
                                                    }
                                                    color="#fff"
                                                    sx={{ fontWeight: 500 }}
                                                >
                                                    {typeDisplayName}
                                                </Box>
                                            </Box>
                                        </Box>

                                        {/* Role dropdown */}
                                        <FormControl size="small" sx={{ width: 120 }}>
                                            <Select
                                                value={memberRoles.role}
                                                onChange={(e) =>
                                                    updateMemberRole(member.id, "role", e.target.value)
                                                }
                                            >
                                                <MenuItem value="Member">Member</MenuItem>
                                                <MenuItem value="PM">PM</MenuItem>
                                                <MenuItem value="Shadow">Shadow</MenuItem>
                                                <MenuItem value="Deactive">Deactive</MenuItem>
                                            </Select>
                                        </FormControl>

                                        {/* Status dropdown */}
                                        <FormControl size="small" sx={{ minWidth: 80 }}>
                                            <Select
                                                value={memberRoles.status}
                                                onChange={(e) =>
                                                    updateMemberRole(member.id, "status", e.target.value)
                                                }
                                            >
                                                <MenuItem value="Official">Official</MenuItem>
                                                <MenuItem value="Temp">Temp</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                );
                            })}
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
                        maxHeight: "100vh",
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
                                <MenuItem value="all">All Branches</MenuItem>
                                <MenuItem value="HN1">HN1</MenuItem>
                                <MenuItem value="HN2">HN2</MenuItem>
                                <MenuItem value="SG1">SG1</MenuItem>
                                <MenuItem value="SG2">SG2</MenuItem>
                                <MenuItem value="ĐN">ĐN</MenuItem>
                                <MenuItem value="Vinh">Vinh</MenuItem>
                                <MenuItem value="QN">QN</MenuItem>
                                <MenuItem value="HN3">HN3</MenuItem>
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
                            <Typography variant="body2" color="text.secondary">
                                No users found.
                            </Typography>
                        ) : (
                            filteredUsers.map((user, index) => {
                                const typeDisplayName = getTypeDisplayName(user.type);
                                const isStaff = user.type === 0;
                                const isInternship = user.type === 1;

                                return (
                                    <Box
                                        key={index}
                                        p={2}
                                        mb={1}
                                        sx={{
                                            border: "1px solid #e0e0e0",
                                            borderRadius: 1,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 2,
                                            backgroundColor: index === 2 ? "#f5f5f5" : "white",
                                            cursor: "pointer",
                                            "&:hover": {
                                                backgroundColor: "#f0f0f0",
                                            },
                                        }}
                                        onClick={() => addMember(user)}
                                    >
                                        {/* Arrow icon */}
                                        <ChevronLeftIcon
                                            sx={{
                                                color: "#000",
                                                fontSize: 20
                                            }}
                                        />

                                        {/* Member status with icon */}
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Typography
                                                variant="body2"
                                                color="text.primary"
                                                fontSize="14px"
                                            >
                                                Member
                                            </Typography>
                                        </Box>

                                        {/* User info */}
                                        <Box flex={1}>
                                            <Typography fontWeight={600} fontSize="14px">
                                                {user.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                fontSize="12px"
                                            >
                                                {user.emailAddress || user.email}
                                            </Typography>
                                        </Box>

                                        {/* Branch and Type labels */}
                                        <Box display="flex" gap={1}>
                                            <Box
                                                px={1.5}
                                                py={0.5}
                                                borderRadius="12px"
                                                fontSize="12px"
                                                bgcolor={
                                                    (user.branchDisplayName || user.branch) === "HN1"
                                                        ? "#1976d2"
                                                        : (user.branchDisplayName || user.branch) === "HN2"
                                                            ? "#388e3c"
                                                            : (user.branchDisplayName || user.branch) === "SG1"
                                                                ? "#f57c00"
                                                                : (user.branchDisplayName || user.branch) === "SG2"
                                                                    ? "#7b1fa2"
                                                                    : (user.branchDisplayName || user.branch) === "ĐN"
                                                                        ? "#455a64"
                                                                        : (user.branchDisplayName || user.branch) === "Vinh"
                                                                            ? "#5d4037"
                                                                            : (user.branchDisplayName || user.branch) === "QN"
                                                                                ? "#c2185b"
                                                                                : (user.branchDisplayName || user.branch) === "HN3"
                                                                                    ? "#0097a7"
                                                                                    : "#d32f2f"
                                                }
                                                color="#fff"
                                                sx={{ fontWeight: 500 }}
                                            >
                                                {user.branchDisplayName || user.branch || ''}
                                            </Box>
                                            <Box
                                                px={1.5}
                                                py={0.5}
                                                borderRadius="12px"
                                                fontSize="12px"
                                                bgcolor={
                                                    isStaff
                                                        ? "#f44336"
                                                        : isInternship
                                                            ? "#4caf50"
                                                            : "#2196f3"
                                                }
                                                color="#fff"
                                                sx={{ fontWeight: 500 }}
                                            >
                                                {typeDisplayName}
                                            </Box>
                                        </Box>
                                    </Box>
                                );
                            })
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default Teams;
