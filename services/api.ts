const API_BASE_URL = 'https://training-api-timesheet.nccsoft.vn/api';

// Helper function to get auth token
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

// Helper function to make authenticated API calls
const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// API functions
export const projectAPI = {
  // Get all projects with status and search parameters
  getAll: async (status: number = 0, search: string = '') => {
    const url = `${API_BASE_URL}/services/app/Project/getAll?status=${status}&search=${encodeURIComponent(search)}`;
    return makeAuthenticatedRequest(url);
  },

  // Get project quantity statistics
  getQuantity: async () => {
    const url = `${API_BASE_URL}/services/app/Project/GetQuantityProject`;
    return makeAuthenticatedRequest(url);
  },

  // Create new project
  create: async (projectData: {
    name: string;
    code: string;
    customerId: number;
    startDate: string;
    endDate: string;
    projectType: string;
    userIds: number[];
    taskIds: number[];
    komuChannelId?: string;
    notifications?: string[];
  }) => {
    const url = `${API_BASE_URL}/services/app/Project/Save`;
    return makeAuthenticatedRequest(url, {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  },
};

export const customerAPI = {
  // Get all customers
  getAll: async () => {
    const url = `${API_BASE_URL}/services/app/Customer/GetAll`;
    return makeAuthenticatedRequest(url);
  },

  // Save customer
  save: async (customerData: { name: string; code: string; address?: string }) => {
    const url = `${API_BASE_URL}/services/app/Customer/Save`;
    return makeAuthenticatedRequest(url, {
      method: 'POST',
      body: JSON.stringify(customerData),
    });
  },
};

export const userAPI = {
  // Get all users (not paginated)
  getAll: async () => {
    const url = `${API_BASE_URL}/services/app/User/GetUserNotPagging`;
    return makeAuthenticatedRequest(url);
  },
};

export const taskAPI = {
  // Get all tasks
  getAll: async () => {
    const url = `${API_BASE_URL}/services/app/Task/GetAll`;
    return makeAuthenticatedRequest(url);
  },
};

export const branchAPI = {
  // Get all branches with isAll=true
  getAll: async () => {
    const url = `${API_BASE_URL}/services/app/Branch/GetAllBranchFilter?isAll=true`;
    return makeAuthenticatedRequest(url);
  },
};

// Types for API responses
export interface Project {
  id: number;
  name: string;
  code: string;
  status: number;
  clientId: number;
  clientName: string;
  startDate: string;
  endDate: string;
  // Add more fields as needed based on actual API response
}

export interface Customer {
  id: number;
  name: string;
  code: string;
  // Add more fields as needed based on actual API response
}

export interface ProjectQuantity {
  total: number;
  active: number;
  inactive: number;
  archived?: number;
  // Add more fields as needed based on actual API response
} 