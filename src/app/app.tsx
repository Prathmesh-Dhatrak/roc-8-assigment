import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { StatisticCard } from '@/components/molecules/StatisticCard';
import { RevenueChart } from '@/components/molecules/RevenueChart';
import { BudgetChart } from '@/components/molecules/BudgetChart';
import { TeamSection } from '@/components/molecules/TeamSection';
import { ProjectList } from '@/components/molecules/ProjectList';
import { GridIcon, CheckCircleIcon, RefreshCwIcon, AlertTriangleIcon, UsersIcon } from 'lucide-react';
import { useDashboard } from '@/hooks/useDashboard';
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from 'react';
import { FilterSection, type FilterState } from '@/components/molecules/FilterSection';
import { Project } from '@/types/dashboard';

function App() {
  const { stats, budgetStatus, revenueData, projects, teamMembers, loading, error } = useDashboard();
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  const handleFilterChange = (filters: FilterState) => {
    let filtered = [...projects];

    if (filters.status !== 'all') {
      filtered = filtered.filter(project => project.status === filters.status);
    }

    if (filters.budget !== 'all') {
      filtered = filtered.filter(project => {
        if (filters.budget === 'over') return project.remainingBudget < 0;
        if (filters.budget === 'under') return project.remainingBudget > 0;
        return true;
      });
    }

    setFilteredProjects(filtered);
  };

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-red-500">Error: {error}</div>
      </DashboardLayout>
    );
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          {/* Main grid container */}
          <div className="grid grid-cols-6 gap-6">
            {/* Left section (5 columns) */}
            <div className="col-span-5 space-y-6">
              {/* Stats row */}
              <div className="grid grid-cols-5 gap-6">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-36 rounded-xl" />
                ))}
              </div>
              {/* Charts row */}
              <div className="grid grid-cols-5 gap-6">
                <Skeleton className="col-span-3 h-[400px] rounded-xl" />
                <Skeleton className="col-span-2 h-[400px] rounded-xl" />
              </div>
            </div>
            {/* Right section (TeamSection - 1 column) */}
            <div className="col-span-1">
              <Skeleton className="h-[calc(100%-1.5rem)] rounded-xl" />
            </div>
          </div>

          {/* Projects Section */}
          <div className="space-y-6">
            <div className="flex gap-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-44 rounded-lg" />
              ))}
            </div>
            <Skeleton className="h-[600px] rounded-xl" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Main grid container */}
        <div className="grid grid-cols-6 gap-6">
          {/* Left section (5 columns) */}
          <div className="col-span-5 space-y-6">
            {/* Stats row */}
            <div className="grid grid-cols-5 gap-6">
              <StatisticCard
                title="Total Projects"
                value={stats?.totalProjects || 0}
                icon={<GridIcon className="w-6 h-6 text-gray-600" />}
              />
              <StatisticCard
                title="Completed"
                value={stats?.completedProjects || 0}
                icon={<CheckCircleIcon className="w-6 h-6 text-emerald-600" />}
              />
              <StatisticCard
                title="Ongoing"
                value={stats?.ongoingProjects || 0}
                icon={<RefreshCwIcon className="w-6 h-6 text-blue-600" />}
              />
              <StatisticCard
                title="Delayed"
                value={stats?.delayedProjects || 0}
                icon={<AlertTriangleIcon className="w-6 h-6 text-red-600" />}
                variant="danger"
              />
              <StatisticCard
                title="Employees"
                value={stats?.totalEmployees || 0}
                icon={<UsersIcon className="w-6 h-6 text-gray-600" />}
              />
            </div>
            {/* Charts row */}
            <div className="grid grid-cols-5 gap-6">
              <RevenueChart data={revenueData} />
              <BudgetChart data={budgetStatus!} />
            </div>
          </div>
          {/* Right section (TeamSection - 1 column) */}
          <div className="col-span-1">
            <TeamSection members={teamMembers} />
          </div>
        </div>

        {/* Projects Section */}
        <div className="space-y-6">
          <FilterSection onFilterChange={handleFilterChange} />
          <ProjectList projects={filteredProjects} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default App;