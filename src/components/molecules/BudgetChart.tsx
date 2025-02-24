import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BudgetStatus } from '@/types/dashboard';

type BudgetChartProps = {
  data: BudgetStatus;
};

export const BudgetChart = ({ data }: BudgetChartProps) => {
  const total = data.overBudget + data.onBudget + data.underBudget;
  const overBudgetPercentage = (data.overBudget / total) * 100;
  const onBudgetPercentage = (data.onBudget / total) * 100;
  const underBudgetPercentage = (data.underBudget / total) * 100;

  const getStrokeDasharray = (percentage: number) => {
    const circumference = 2 * Math.PI * 40;
    return `${(percentage * circumference) / 100} ${circumference}`;
  };

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Budget</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="40"
              fill="none"
              stroke="#0EA5E9"
              strokeWidth="24"
              strokeDasharray={getStrokeDasharray(underBudgetPercentage)}
              className="relative z-30 sm:transform sm:scale-125 md:scale-150"
            />
            <circle
              cx="64"
              cy="64"
              r="40"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="24"
              strokeDasharray={getStrokeDasharray(onBudgetPercentage)}
              strokeDashoffset={`${-(2 * Math.PI * 40 * underBudgetPercentage) / 100}`}
              className="relative z-20 sm:transform sm:scale-125 md:scale-150"
            />
            <circle
              cx="64"
              cy="64"
              r="40"
              fill="none"
              stroke="#EF4444"
              strokeWidth="24"
              strokeDasharray={getStrokeDasharray(overBudgetPercentage)}
              strokeDashoffset={`${-(2 * Math.PI * 40 * (underBudgetPercentage + onBudgetPercentage)) / 100}`}
              className="relative z-10 sm:transform sm:scale-125 md:scale-150"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold">{total}</div>
              <div className="text-xs sm:text-sm text-gray-500">Total projects</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-6 md:mt-8 w-full">
          <div className="text-center">
            <div className="text-xs sm:text-sm font-medium text-red-500">Over Budget</div>
            <div className="text-base sm:text-xl md:text-2xl font-bold">{data.overBudget}</div>
          </div>
          <div className="text-center">
            <div className="text-xs sm:text-sm font-medium text-gray-500">On Budget</div>
            <div className="text-base sm:text-xl md:text-2xl font-bold">{data.onBudget}</div>
          </div>
          <div className="text-center">
            <div className="text-xs sm:text-sm font-medium text-blue-500">Under Budget</div>
            <div className="text-base sm:text-xl md:text-2xl font-bold">{data.underBudget}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};