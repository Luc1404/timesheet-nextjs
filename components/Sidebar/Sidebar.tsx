"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BarChartIcon from "@mui/icons-material/BarChart";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Sidebar({ children }: { children?: React.ReactNode }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    setAnchorEl(null);
    router.push("/login");
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "row", flex: 1, minHeight: 0 }}>
      <Box
        sx={{
          width: "300px",
          background: "#fff",
          boxShadow: "2px 0 8px rgba(0,0,0,0.08)",
        }}
      >
        {/* Sidebar Profile */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            position: "relative",
            height: 90,
            overflow: "visible",
          }}
        >
          <Image
            src="/bg.jpg"
            alt="Sidebar Background"
            width={220}
            height={80}
            style={{ objectFit: "cover", width: "100%", height: "90px" }}
          />
          {/* User profile content overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              zIndex: 2,
            }}
          >
            <Avatar
              src="/img.jpg"
              alt="User Avatar"
              sx={{
                width: 48,
                height: 48,
                ml: 1.75,
                mr: 1.75,
                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                bgcolor: "#fff",
              }}
            />
            <Box
              sx={{
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                flex: 1,
                textShadow: "0 1px 6px rgba(0,0,0,0.18)",
              }}
            >
              <Typography sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                admin dev
              </Typography>
              <Typography sx={{ fontSize: "0.97rem", opacity: 0.97 }}>
                admin.dev@gmail.com
              </Typography>
            </Box>
            <IconButton
              aria-label="profile menu"
              aria-controls={open ? "profile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleMenuClick}
              sx={{
                color: "#fff",
                alignSelf: "flex-end",
                ml: 1,
                boxShadow: "none",
                textShadow: "0 1px 6px rgba(0,0,0,0.18)",
              }}
            >
              <KeyboardArrowDownIcon sx={{ fontSize: "1.5rem", opacity: 0.85 }} />
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                sx: {
                  mt: -3,
                  minWidth: 130,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                },
              }}
            >
              <MenuItem
                onClick={handleLogout}
                sx={{ fontWeight: 500, fontSize: "1rem" }}
              >
                <LogoutIcon sx={{ mr: 1.5, fontSize: "1.3rem" }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* Sidebar Menu */}
        <List  sx={{ pt: 0, pb: 0 }}>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
                <BarChartIcon
                  sx={{
                    background: "#f44336",
                    color: "#fff",
                    borderRadius: "8px",
                    fontSize: 24,
                    p: 0.7,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Projects"
                primaryTypographyProps={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#f44336",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      {/* Main content area (children) */}
      <Box sx={{ flex: 1, minHeight: 0, p: 0, backgroundColor: "rgb(217, 215, 215)" }}>
        {children}
      </Box>
    </Box>
  );
}
