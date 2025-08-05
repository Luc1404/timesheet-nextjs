
import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Alert,
} from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { customerAPI } from "../../../../../services/api";
import { Customer } from "../../../../../types";

interface ClientTabProps {
    onClose: () => void;
    onClientCreated: (newClient: Customer) => void;
}

const ClientTab: React.FC<ClientTabProps> = ({ onClose, onClientCreated }) => {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [address, setAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSave = async () => {
        if (!name || !code) return;
        
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        
        try {
            const response = await customerAPI.save({
                name,
                code,
                address: address || undefined,
            });
            
            // Create a new client object with the response data
            const newClient: Customer = {
                id: response.result?.id || Date.now(), // Use response ID or fallback to timestamp
                name,
                code,
                address: address || undefined,
            };
            
            // Call the callback with the new client
            onClientCreated(newClient);
            
            setSuccess(true);
            // Reset form
            setName("");
            setCode("");
            setAddress("");
            
            // Close after a short delay to show success message
            setTimeout(() => {
                onClose();
            }, 1500);
            
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to save customer");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ p: 1, width: 400 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
                New Client
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    Customer saved successfully!
                </Alert>
            )}

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
                    disabled={!name || !code || isLoading}
                    onClick={handleSave}
                    sx={{ bgcolor: "#f44336", textTransform: "none" }}
                >
                    {isLoading ? "Saving..." : "Save"}
                </Button>
            </Stack>
        </Box>
    );
};

export default ClientTab;
