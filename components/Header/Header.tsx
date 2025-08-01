"use client";

import React from "react";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DescriptionIcon from "@mui/icons-material/Description";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useAuth } from "../AuthContext";

export default function Header() {


  return (
    <AppBar position="fixed" sx={{ background: "#f44336", boxShadow: "none", width: '100%', height: 64, zIndex: 1300 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", minHeight: 64 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/Timesheet logo.png"
            alt="Timesheet Logo"
            width={40}
            height={40}
            style={{ marginRight: 2, height: "auto" }}
          />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            TimeSheet
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Tooltip title="Release Note">
            <IconButton
              component="a"
              href="https://docs.google.com/document/d/13kP2JNm9BhWx0-BW7Hb0RJmukF4r6G9JjZb6tIpcEUU/edit"
              target="_blank"
              sx={{ color: "white" }}
            >
              <DescriptionIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
          <Tooltip title="User guide">
            <IconButton
              component="a"
              href="https://docs.google.com/document/d/1M4EM-uPJLOxYx-BW8xyQsNjZFTQpgFA42GdtYjNok64/edit"
              target="_blank"
              sx={{ color: "white" }}
            >
              <MenuBookIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Image
              src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
              alt="UK Flag"
              width={18}
              height={12}
              style={{ marginRight: 2, height: "auto" }}
            />
            <Typography variant="body2" sx={{ fontWeight: 500, ml: 1, color: "white" }}>
              English
            </Typography>
            <ArrowDropDownIcon fontSize="small" sx={{ color: "white" }} />
            <IconButton sx={{ color: "white", ml: 1 }}>
              <MoreVertIcon fontSize="medium" />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 