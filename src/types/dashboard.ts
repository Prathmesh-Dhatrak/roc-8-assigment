export type ProjectStatus = 'completed' | 'ongoing' | 'delayed';
export type MoodType = 'happy' | 'neutral' | 'sad';

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  totalBudget: number;
  remainingBudget: number;
  actualHours: number;
  estimatedHours: number;
  team: TeamMember[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: React.ComponentType<{className?: string}>;
  mood: MoodType;
}

export interface RevenueData {
  date: string;
  amount: number;
}

export interface DashboardStats {
  totalProjects: number;
  completedProjects: number;
  ongoingProjects: number;
  delayedProjects: number;
  totalEmployees: number;
}

export interface BudgetStatus {
  overBudget: number;
  onBudget: number;
  underBudget: number;
}