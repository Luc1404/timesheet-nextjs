import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Collapse,
  IconButton,
  Checkbox,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const TasksTab: React.FC<{ tasks?: any[] }> = ({ tasks = [] }) => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [addedTasks, setAddedTasks] = useState<any[]>([]);
  const [availableTasks, setAvailableTasks] = useState<any[]>(tasks);

  const toggleOpen = () => setOpen(!open);

  const handleAddTask = (task: any) => {
    if (!addedTasks.find(t => t.id === task.id)) {
      setAddedTasks(prev => [...prev, { ...task, billable: false }]);
      setAvailableTasks(prev => prev.filter(t => t.id !== task.id));
    }
    setSelectedTask(null);
  };
  const handleRemoveTask = (task: any) => {
    setAddedTasks(prev => prev.filter(t => t.id !== task.id));

    setAvailableTasks(prev => {
      if (!prev.find(t => t.id === task.id)) {
        return [...prev, task];
      }
      return prev;
    });
    setSelectedTask(task.id);
  };

  const handleToggleBillable = (taskId: string) => {
    setAddedTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, billable: !task.billable } : task
      )
    );
  };

  // Thêm useMemo để tính trạng thái check all
  const allChecked = useMemo(() =>
    addedTasks.length > 0 && addedTasks.every(task => task.billable), [addedTasks]
  );
  const someChecked = useMemo(() =>
    addedTasks.some(task => task.billable) && !allChecked, [addedTasks, allChecked]
  );

  const handleToggleAllBillable = () => {
    const newValue = !allChecked;
    setAddedTasks(prev => prev.map(task => ({ ...task, billable: newValue })));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          px: 2,

          borderTop: '1px solid #ddd',
          borderBottom: '1px solid #ddd',
          backgroundColor: "#fafafa",
          cursor: "pointer",
          '&:hover': {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <Box flex={1} display="flex" alignItems="center">
          <Typography fontWeight="bold">Tasks</Typography>
        </Box>
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          justifyContent="start"
          alignItems="start"
        >
          <Typography fontWeight="bold" mt={1}>
            Billable
          </Typography>
          <Checkbox
            checked={allChecked}
            indeterminate={someChecked}
            onChange={handleToggleAllBillable}
            disabled={addedTasks.length === 0}
            sx={{
              '&.Mui-checked': {
                color: '#f44336',
              },
              '&.MuiCheckbox-indeterminate': {
                color: '#f44336',
              },
            }}
          />
        </Box>
      </Box>
      {addedTasks.map(task => (
        <Paper
          key={task.id}
          elevation={0}
          sx={{
            px: 2,
            py: 0.5,
            width: '100%',
            borderTop: '1px solid #ddd',
            borderBottom: '1px solid #ddd',
            borderRadius: 0,
            backgroundColor: '#fafafa',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box flex={1} display="flex" alignItems="center">
              <IconButton onClick={() => handleRemoveTask(task)}>
                <CloseIcon sx={{ fontSize: 24, color: '#555' }} />
              </IconButton>
              <Typography
                fontWeight={500}
                noWrap
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {task.name}
              </Typography>
            </Box>
            <Box
              flex={1}
              display="flex"
              flexDirection="column"
              justifyContent="start"
              alignItems="start"
            >
              <Checkbox checked={task.billable} onChange={() => handleToggleBillable(task.id)} sx={{
                '&.Mui-checked': {
                  color: '#f44336',
                },
              }} />
            </Box>
          </Box>
        </Paper>
      ))}
      <Box
        onClick={toggleOpen}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          mt: 2,
          py: 1.5,
          height: "70px",
          borderRadius: 1,
          backgroundColor: "#fafafa",
          cursor: "pointer",
          '&:hover': {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <Typography fontWeight={600} fontSize={20}>
          Selected Task
        </Typography>
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Box>

      <Collapse in={open}>
        <Box>
          {availableTasks.map((task) => (
            <Paper
              key={task.id}
              onClick={() => setSelectedTask(task.id)}
              elevation={0}
              sx={{
                px: 2,
                py: 1.5,
                cursor: "pointer",
                width: '100%',
                borderTop: '1px solid #ddd',
                borderBottom: '1px solid #ddd',
                borderRadius: 0,
                backgroundColor:
                  selectedTask === task.id
                    ? '#ffffff'
                    : '#f2f2f2',
              }}
            >
              <Box display="flex" alignItems="center">
                <IconButton
                  onClick={() => handleAddTask(task)}
                  sx={{
                    border: '2px solid #555',
                    borderRadius: '50%',
                    width: 24,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 1,
                    p: 0.5,
                  }}
                >
                  <AddIcon sx={{ fontSize: 20, color: '#555' }} />
                </IconButton>

                <Typography
                  fontWeight={500}
                  noWrap
                  sx={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    width: '100%',
                  }}
                >
                  {task.name}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export default TasksTab;
