import React, { useCallback } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import General from "./General/General";
import Notification from "./Notification/Notification";
import TasksTab from "./Task/Task";
import Team from "./Teams/Teams";
import { Customer, User, Task, Branch } from "../../../types";
import { projectAPI } from "../../../services/api";
import dayjs from "dayjs";

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
  onSaveSuccess?: () => void;
  customers: Customer[];
  users: User[];
  tasks: Task[];
  branches: Branch[];
}

// Interface for form validation state
interface FormValidationState {
  general: {
    isValid: boolean;
    client: string;
    projectName: string;
    projectCode: string;
    startAt: dayjs.Dayjs | null;
    endAt: dayjs.Dayjs | null;
    projectType: string;
    note: string;
    allUser: boolean;
  };
  team: {
    isValid: boolean;
    selectedMembers: User[];
  };
  tasks: {
    isValid: boolean;
    addedTasks: Task[];
  };
  notification: {
    isValid: boolean;
    komuChannelId: string;
    selectedNotifications: string[];
  };
}

const ProjectForm: React.FC<ProjectFormProps> = ({ open, onClose, onSaveSuccess, customers, users, tasks, branches }) => {
  const [tab, setTab] = React.useState(0);
  const [formValidation, setFormValidation] = React.useState<FormValidationState>({
    general: {
      isValid: false,
      client: "",
      projectName: "",
      projectCode: "",
      startAt: null,
      endAt: null,
      projectType: "",
      note: "",
      allUser: false,
    },
    team: {
      isValid: false,
      selectedMembers: [],
    },
    tasks: {
      isValid: false,
      addedTasks: [],
    },
    notification: {
      isValid: true, // Notification tab is optional
      komuChannelId: "",
      selectedNotifications: [],
    },
  });

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) =>
    setTab(newValue);

  // Update validation state for each tab
  const updateGeneralValidation = useCallback((data: Partial<FormValidationState['general']>) => {
    setFormValidation(prev => ({
      ...prev,
      general: {
        ...prev.general,
        ...data,
        isValid: !!(data.client || prev.general.client) && 
                 !!(data.projectName || prev.general.projectName) && 
                 !!(data.projectCode || prev.general.projectCode) &&
                 !!(data.startAt || prev.general.startAt) &&
                 !!(data.endAt || prev.general.endAt) &&
                 !!(data.projectType || prev.general.projectType)
      }
    }));
  }, []);

  const updateTeamValidation = useCallback((selectedMembers: User[]) => {
    setFormValidation(prev => ({
      ...prev,
      team: {
        ...prev.team,
        selectedMembers,
        isValid: selectedMembers.length > 0
      }
    }));
  }, []);

  const updateTasksValidation = useCallback((addedTasks: Task[]) => {
    setFormValidation(prev => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        addedTasks,
        isValid: addedTasks.length > 0
      }
    }));
  }, []);

  const updateNotificationValidation = useCallback((data: Partial<FormValidationState['notification']>) => {
    setFormValidation(prev => ({
      ...prev,
      notification: {
        ...prev.notification,
        ...data,
        isValid: true // Notification is always valid as it's optional
      }
    }));
  }, []);

  // Check if all required tabs are valid
  const isFormValid = React.useMemo(() => {
    return formValidation.general.isValid && 
           formValidation.team.isValid && 
           formValidation.tasks.isValid;
  }, [formValidation]);

  const [isSaving, setIsSaving] = React.useState(false);
  const [generalInitialData, setGeneralInitialData] = React.useState(formValidation.general);

  // Reset form when dialog opens/closes
  React.useEffect(() => {
    if (!open) {
      setFormValidation({
        general: {
          isValid: false,
          client: "",
          projectName: "",
          projectCode: "",
          startAt: null,
          endAt: null,
          projectType: "",
          note: "",
          allUser: false,
        },
        team: {
          isValid: false,
          selectedMembers: [],
        },
        tasks: {
          isValid: false,
          addedTasks: [],
        },
        notification: {
          isValid: true,
          komuChannelId: "",
          selectedNotifications: [],
        },
      });
      setTab(0);
    }
  }, [open]);

  React.useEffect(() => {
    if (open) {
      setGeneralInitialData(formValidation.general);
    }
  }, [open]);

  const handleSave = async () => {
    if (isFormValid && !isSaving) {
      setIsSaving(true);
      try {
        // Tìm customer ID từ id (không phải name)
        const selectedCustomer = customers.find(c => c.id === Number(formValidation.general.client));
        if (!selectedCustomer) {
          throw new Error("Customer not found");
        }

        // Chuẩn bị dữ liệu để gửi API
        const projectData = {
          name: formValidation.general.projectName,
          code: formValidation.general.projectCode,
          customerId: selectedCustomer.id,
          startDate: formValidation.general.startAt?.format('YYYY-MM-DD') || '',
          endDate: formValidation.general.endAt?.format('YYYY-MM-DD') || '',
          projectType: formValidation.general.projectType,
          userIds: formValidation.team.selectedMembers.map(user => user.id),
          taskIds: formValidation.tasks.addedTasks.map(task => task.id),
          komuChannelId: formValidation.notification.komuChannelId,
          notifications: formValidation.notification.selectedNotifications,
        };

        // 1. Gọi API lưu project
        const response = await projectAPI.create(projectData);
        console.log("API response:", response);
        // Kiểm tra thành công dựa trên response.result (chuẩn ABP)
        if (response && response.result) {
          // 2. Gọi API lấy danh sách project mới nhất
          await projectAPI.getAll(0, "");
          // 3. Gọi API lấy số lượng project
          await projectAPI.getQuantity();

          // Gọi callback để refresh dữ liệu ở toolbar (nếu cần)
          if (onSaveSuccess) {
            onSaveSuccess();
          }
          onClose();
        } else {
          // Nếu có lỗi chi tiết từ API thì hiển thị
          const errorMsg = response && response.error && response.error.message
            ? response.error.message
            : "Failed to create project";
          throw new Error(errorMsg);
        }
      } catch (error) {
        console.error("Error creating project:", error);
        // Không hiển thị alert, chỉ log lỗi để debug
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth sx={{
    "& .MuiDialog-paper": {
      height: "650px",

    },
  }}>
      <DialogTitle
        sx={{
          fontWeight: 600,
          fontSize: 28,
          pb: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Create Project
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider sx={{ mt: 2, mx: 3 }} />
      <DialogContent sx={{ pt: 0 }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
            },
            "& .Mui-selected": {
              color: "#f44336 !important",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#f44336",
            },
          }}
        >
          <Tab label="General" />
          <Tab label="Team" />
          <Tab label="Tasks" />
          <Tab label="Notification" />
        </Tabs>
        <Divider />
         {tab === 0 && <General 
           customers={customers} 
           onValidationChange={updateGeneralValidation}
           initialData={formValidation.general}
         />}
         {tab === 1 && <Team 
           users={users} 
           branches={branches} 
           onValidationChange={updateTeamValidation}
           initialData={formValidation.team}
         />}
         {tab === 2 && <TasksTab 
           tasks={tasks} 
           onValidationChange={updateTasksValidation}
           initialData={formValidation.tasks}
         />}
         {tab === 3 && <Notification 
           onValidationChange={updateNotificationValidation}
           initialData={formValidation.notification}
         />}
      </DialogContent>
       <Divider sx={{ mx: 3 }} />
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            textTransform: "none",
            color: "#6e6e6e",
            borderColor: "#6e6e6e",
            "&:hover": {
              borderColor: "#6e6e6e",
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSave}
          disabled={!isFormValid || isSaving}
          sx={{ 
            bgcolor: isFormValid && !isSaving ? "#f44336" : "#cccccc",
            color: isFormValid && !isSaving ? "#ffffff" : "#666666",
            textTransform: "none",
            "&:hover": {
              bgcolor: isFormValid && !isSaving ? "#d32f2f" : "#cccccc",
            },
            "&:disabled": {
              bgcolor: "#cccccc",
              color: "#666666",
            }
          }} 
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectForm;
