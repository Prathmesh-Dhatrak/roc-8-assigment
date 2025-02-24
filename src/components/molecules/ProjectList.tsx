import { Project } from "@/types/dashboard";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Plus,
  Download,
  Settings2,
  User
} from 'lucide-react';

type ProjectListProps = {
  projects: Project[];
};

export const ProjectList = ({ projects }: ProjectListProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />;
      case "ongoing":
        return <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />;
      case "delayed":
        return <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />;
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
      return <AvatarIcon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />;
    }
    return <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-lg sm:text-xl font-medium">Budget status</h2>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 sm:px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Project
          </button>
          <button className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Download report
          </button>
          <button className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
            <Settings2 className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <div className="p-4 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {renderTeamAvatar(project)}
                    <div>
                      <h3 className="font-medium text-sm sm:text-base text-gray-900">{project.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-500">Vercel</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusIcon(project.status)}
                  </div>
                </div>

                {/* Budget Info */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Total Budget</p>
                    <p className="text-sm font-medium">€{project.totalBudget.toLocaleString()}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Remaining Budget</p>
                    <p className={`text-sm font-medium ${project.remainingBudget < 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                      {project.remainingBudget < 0 ? '-' : ''}€{Math.abs(project.remainingBudget).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Actual Hours</p>
                    <p className="text-sm font-medium">{project.actualHours}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getProgressBarColor(project.status)}`}
                      style={{
                        width: `${Math.min((project.actualHours / project.estimatedHours) * 100, 100)}%`
                      }}
                    />
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    {project.actualHours > project.estimatedHours 
                      ? `${project.actualHours - project.estimatedHours} hours over Budget!`
                      : `${project.estimatedHours} sold hours`}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};