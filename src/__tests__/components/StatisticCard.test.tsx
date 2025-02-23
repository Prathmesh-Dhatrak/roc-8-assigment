import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatisticCard } from '@/components/molecules/StatisticCard';
import { GridIcon } from 'lucide-react';

describe('StatisticCard', () => {
  it('renders correctly with default variant', () => {
    render(
      <StatisticCard
        title="Test Card"
        value={42}
        icon={<GridIcon data-testid="grid-icon" />}
      />
    );

    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByTestId('grid-icon')).toBeInTheDocument();
  });

  it('applies danger variant styles correctly', () => {
    const { container } = render(
      <StatisticCard
        title="Danger Card"
        value={1}
        icon={<GridIcon />}
        variant="danger"
      />
    );

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('bg-red-100');
  });
});