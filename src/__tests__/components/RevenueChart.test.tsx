import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RevenueChart } from '@/components/molecules/RevenueChart';
import type { ReactNode } from 'react';

// Define interfaces for mock components
interface ResponsiveContainerProps {
  children: ReactNode;
}

interface LineChartProps {
  children: ReactNode;
}

// Mock the Recharts components
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: ResponsiveContainerProps) => (
    <div style={{ width: 500, height: 300 }}>{children}</div>
  ),
  LineChart: ({ children }: LineChartProps) => (
    <div data-testid="line-chart">{children}</div>
  ),
  Line: () => <div>Line</div>,
  XAxis: () => <div>XAxis</div>,
  YAxis: () => <div>YAxis</div>,
  CartesianGrid: () => <div>CartesianGrid</div>,
  Tooltip: () => <div>Tooltip</div>,
}));

const mockData = [
  { date: '19 June', amount: 1000 },
  { date: '20 June', amount: 2000 },
];

describe('RevenueChart', () => {
  it('renders with data', () => {
    render(<RevenueChart data={mockData} />);
    expect(screen.getByText('Total revenue')).toBeInTheDocument();
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });

  it('toggles between week and month view', () => {
    render(<RevenueChart data={mockData} />);
    const weekButton = screen.getByText('Week');
    const monthButton = screen.getByText('Month');

    fireEvent.click(monthButton);
    expect(monthButton).toHaveClass('bg-gray-200');
    
    fireEvent.click(weekButton);
    expect(weekButton).toHaveClass('bg-gray-200');
  });
});