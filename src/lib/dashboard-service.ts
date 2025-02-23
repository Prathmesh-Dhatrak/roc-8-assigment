import { 
    mockProjects, 
    mockTeamMembers, 
    mockRevenueData 
  } from './mock-data';
  import { 
    DashboardStats, 
    BudgetStatus, 
    Project, 
    TeamMember, 
    RevenueData 
  } from '../types/dashboard';
  
  class DashboardService {
    async getStats(): Promise<DashboardStats> {
      const stats = {
        totalProjects: mockProjects.length,
        completedProjects: mockProjects.filter(p => p.status === 'completed').length,
        ongoingProjects: mockProjects.filter(p => p.status === 'ongoing').length,
        delayedProjects: mockProjects.filter(p => p.status === 'delayed').length,
        totalEmployees: mockTeamMembers.length
      };
      
      return new Promise(resolve => setTimeout(() => resolve(stats), 500));
    }
  
    async getBudgetStatus(): Promise<BudgetStatus> {
      const status = {
        overBudget: mockProjects.filter(p => p.remainingBudget < 0).length,
        onBudget: mockProjects.filter(p => p.remainingBudget === 0).length,
        underBudget: mockProjects.filter(p => p.remainingBudget > 0).length
      };
      
      return new Promise(resolve => setTimeout(() => resolve(status), 500));
    }
  
    async getRevenueData(): Promise<RevenueData[]> {
      return new Promise(resolve => setTimeout(() => resolve(mockRevenueData), 500));
    }
  
    async getProjects(): Promise<Project[]> {
      return new Promise(resolve => setTimeout(() => resolve(mockProjects), 500));
    }
  
    async getTeamMembers(): Promise<TeamMember[]> {
      return new Promise(resolve => setTimeout(() => resolve(mockTeamMembers), 500));
    }
  }
  
  export const dashboardService = new DashboardService();