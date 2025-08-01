
import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
} from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

interface ClientTabProps {
    onClose: () => void;
}

const ClientTab: React.FC<ClientTabProps> = ({ onClose }) => {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [address, setAddress] = useState("");

    return (
        <Box sx={{ p: 1, width: 400 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
                New Client
            </Typography>

            <TextField
                required
                fullWidth
                placeholder="Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                    sx: {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#f44336",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#f44336",
                        },
                    },
                }}
            />

            <TextField
                required
                fullWidth
                placeholder="Code *"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                    sx: {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#f44336",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#f44336",
                        },
                    },
                }}
            />
            <TextareaAutosize
                minRows={3}
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{
                    width: "100%",
                    fontSize: "16px",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    marginBottom: "20px",
                    fontFamily: "Roboto, sans-serif",
                }}
            />

            <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button onClick={onClose} variant="outlined" sx={{
                    textTransform: "none",
                    color: "#6e6e6e",
                    borderColor: "#6e6e6e",
                    "&:hover": {
                        borderColor: "#6e6e6e",
                        backgroundColor: "#f5f5f5",
                    },
                }}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    disabled={!name || !code}
                    sx={{ bgcolor: "#f44336", textTransform: "none" }}
                >
                    Save
                </Button>
            </Stack>
        </Box>
    );
};

export default ClientTab;
