import { useState, useEffect } from 'react';
import { dashboardService } from '../lib/dashboard-service';
import { DashboardStats, BudgetStatus, Project, TeamMember, RevenueData } from '../types/dashboard';

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [budgetStatus, setBudgetStatus] = useState<BudgetStatus | null>(null);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [
          statsData,
          budgetData,
          revenueData,
          projectsData,
          teamData
        ] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getBudgetStatus(),
          dashboardService.getRevenueData(),
          dashboardService.getProjects(),
          dashboardService.getTeamMembers()
        ]);

        setStats(statsData);
        setBudgetStatus(budgetData);
        setRevenueData(revenueData);
        setProjects(projectsData);
        setTeamMembers(teamData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return {
    stats,
    budgetStatus,
    revenueData,
    projects,
    teamMembers,
    loading,
    error
  };
};