import { Project } from "@/types/dashboard";
import { motion } from "framer-motion";
import { 
  AlertTriangleIcon, 
  CheckCircleIcon, 
  TrendingUpIcon, 
  PlusIcon, 
  DownloadIcon, 
  SlidersIcon, 
  UserIcon 
} from 'lucide-react';

type ProjectListProps = {
  projects: Project[];
};

export const ProjectList = ({ projects }: ProjectListProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon className="w-5 h-5 text-emerald-500" />;
      case "ongoing":
        return <TrendingUpIcon className="w-5 h-5 text-amber-500" />;
      case "delayed":
        return <AlertTriangleIcon className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getProgressBarColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500";
      case "ongoing":
        return "bg-amber-500";
      case "delayed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const renderTeamAvatar = (project: Project) => {
    if (project.team.length > 0) {
      const AvatarIcon = project.team[0].avatar;
      return <AvatarIcon className="w-10 h-10 text-gray-500" />;
    }
    return <UserIcon className="w-10 h-10 text-gray-500" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Budget status</h2>
        <div className="flex gap-2">
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700">
            <PlusIcon className="w-4 h-4 mr-2" />
            Add New Project
          </button>
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Download report
          </button>
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
            <SlidersIcon className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            <div className="grid grid-cols-[auto,1fr,auto] gap-8 items-center">
              {/* Project Info */}
              <div className="flex items-center gap-3">
                {renderTeamAvatar(project)}
                <div>
                  <h3 className="font-medium text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-500">Vercel</p>
                </div>
              </div>

              {/* Budget Info */}
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-sm text-gray-500">Total Budget</p>
                  <p className="font-medium">€{project.totalBudget.toLocaleString()}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Remaining Budget</p>
                  <p className={`font-medium ${project.remainingBudget < 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                    {project.remainingBudget < 0 ? '-' : ''}€{Math.abs(project.remainingBudget).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Actual Hours</p>
                  <p className="font-medium">{project.actualHours}</p>
                </div>
              </div>

              {/* Status Icon */}
              <div>
                {getStatusIcon(project.status)}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressBarColor(project.status)}`}
                  style={{
                    width: `${Math.min((project.actualHours / project.estimatedHours) * 100, 100)}%`
                  }}
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {project.actualHours > project.estimatedHours 
                  ? `${project.actualHours - project.estimatedHours} hours over Budget!`
                  : `${project.estimatedHours} sold hours`}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};