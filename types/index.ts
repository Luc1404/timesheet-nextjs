export interface Customer {
  id: number;
  name: string;
  code?: string;
  address?: string;
  [key: string]: unknown;
}

export interface User {
  id: number;
  name: string;
  email?: string;
  emailAddress?: string;
  branch?: string;
  branchDisplayName?: string;
  type?: number | string;
  [key: string]: unknown;
}

export interface Task {
  id: number;
  name: string;
  billable?: boolean;
  [key: string]: unknown;
}

export interface Branch {
  id: number;
  name: string;
  [key: string]: unknown;
}

export interface Project {
  id: number;
  name: string;
  code: string;
  customerName: string;
  activeMember: number;
  pms: string[];
  timeStart: string;
  timeEnd: string;
  status: number;
  projectType?: string;
}

export interface ProjectQuantityItem {
  status: number;
  quantity: number;
}

export interface GroupedProjects {
  [key: string]: Project[];
} 