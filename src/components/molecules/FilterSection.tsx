import { useState } from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FilterSectionProps = {
  onFilterChange: (filters: FilterState) => void;
};

export interface FilterState {
  status: string;
  budget: string;
  date: string;
}

export const FilterSection = ({ onFilterChange }: FilterSectionProps) => {
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    budget: 'all',
    date: 'all'
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex gap-4 mb-4">
      <Select 
        onValueChange={(value) => handleFilterChange('status', value)}
        defaultValue={filters.status}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue>All Status</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="ongoing">Ongoing</SelectItem>
          <SelectItem value="delayed">Delayed</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        onValueChange={(value) => handleFilterChange('budget', value)}
        defaultValue={filters.budget}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue>All Budget</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Budget</SelectItem>
          <SelectItem value="over">Over Budget</SelectItem>
          <SelectItem value="under">Under Budget</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        onValueChange={(value) => handleFilterChange('date', value)}
        defaultValue={filters.date}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue>All Time</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="week">This Week</SelectItem>
          <SelectItem value="month">This Month</SelectItem>
          <SelectItem value="quarter">This Quarter</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};