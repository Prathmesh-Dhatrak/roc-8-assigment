// src/__tests__/hooks/useDashboard.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from '@testing-library/react';
import { useDashboard } from '@/hooks/useDashboard';


// Mock the module before importing
vi.mock('@/lib/dashboard-service', () => {
  const dashboardService = {
    getStats: vi.fn(),
    getBudgetStatus: vi.fn(),
    getRevenueData: vi.fn(),
    getProjects: vi.fn(),
    getTeamMembers: vi.fn(),
  };
  return { dashboardService };
});

// Import the mocked service after mocking
import { dashboardService } from '@/lib/dashboard-service';

describe('useDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup default mock implementations with delayed responses
    vi.mocked(dashboardService.getStats).mockImplementation(() =>
      new Promise(resolve => setTimeout(() => resolve({
        totalProjects: 5,
        completedProjects: 1,
        ongoingProjects: 3,
        delayedProjects: 1,
        totalEmployees: 5,
      }), 100))
    );

    vi.mocked(dashboardService.getBudgetStatus).mockImplementation(() =>
      new Promise(resolve => setTimeout(() => resolve({
        overBudget: 1,
        onBudget: 2,
        underBudget: 2,
      }), 100))
    );

    vi.mocked(dashboardService.getRevenueData).mockImplementation(() =>
      new Promise(resolve => setTimeout(() => resolve([
        { date: '19 June', amount: 1000 },
        { date: '20 June', amount: 2000 },
      ]), 100))
    );

    vi.mocked(dashboardService.getProjects).mockImplementation(() =>
      new Promise(resolve => setTimeout(() => resolve([]), 100))
    );

    vi.mocked(dashboardService.getTeamMembers).mockImplementation(() =>
      new Promise(resolve => setTimeout(() => resolve([]), 100))
    );
  });

  it('initializes with loading state', () => {
    const { result } = renderHook(() => useDashboard());
    expect(result.current.loading).toBe(true);
  });

  it('loads data successfully', async () => {
    const { result } = renderHook(() => useDashboard());

    // Initial state should be loading
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    // Wait for all promises to resolve
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 200));
    });

    // Assert final state
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.stats).toEqual({
      totalProjects: 5,
      completedProjects: 1,
      ongoingProjects: 3,
      delayedProjects: 1,
      totalEmployees: 5,
    });

    // Verify all service methods were called
    expect(dashboardService.getStats).toHaveBeenCalledTimes(1);
    expect(dashboardService.getBudgetStatus).toHaveBeenCalledTimes(1);
    expect(dashboardService.getRevenueData).toHaveBeenCalledTimes(1);
    expect(dashboardService.getProjects).toHaveBeenCalledTimes(1);
    expect(dashboardService.getTeamMembers).toHaveBeenCalledTimes(1);
  });

  it('handles error state', async () => {
    const error = new Error('Failed to fetch data');
    vi.mocked(dashboardService.getStats).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useDashboard());

    // Wait for error to be set
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to fetch data');
  });
});