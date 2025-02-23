import { cn } from '@/lib/utils';

type StatusBadgeProps = {
  status: 'completed' | 'ongoing' | 'delayed';
  className?: string;
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusStyles = {
    completed: 'bg-emerald-100 text-emerald-700',
    ongoing: 'bg-blue-100 text-blue-700',
    delayed: 'bg-red-100 text-red-700',
  };

  return (
    <span className={cn('px-2 py-1 rounded-full text-sm font-medium', statusStyles[status], className)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};