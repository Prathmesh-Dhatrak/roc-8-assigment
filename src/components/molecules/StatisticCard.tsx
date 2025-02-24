import { cn } from "@/lib/utils";

type StatisticCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  variant?: 'default' | 'danger';
};

export const StatisticCard = ({ title, value, icon, variant = 'default' }: StatisticCardProps) => {
  return (
    <div className={cn(
      'p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl bg-white shadow-sm',
      variant === 'danger' ? 'bg-red-50' : 'bg-white'
    )}>
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <div className={cn(
          'p-2 sm:p-3 rounded-lg sm:rounded-xl',
          variant === 'danger' ? 'bg-red-100' : 'bg-gray-50'
        )}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">{value}</h3>
          <p className="text-xs sm:text-sm text-gray-500">{title}</p>
        </div>
      </div>
    </div>
  );
};