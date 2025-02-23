// src/test/setup.ts
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { 
  toBeInTheDocument,
  toHaveClass 
} from '@testing-library/jest-dom/matchers';
import { vi } from 'vitest';

// Extend Vitest's expect method
expect.extend({
  toBeInTheDocument,
  toHaveClass,
});

// Add custom matchers to TypeScript
declare module 'vitest' {
  interface Assertion<T> {
    toBeInTheDocument(): Assertion<T>;
    toHaveClass(className: string): Assertion<T>;
  }
  interface AsymmetricMatchersContaining {
    toBeInTheDocument(): unknown;
    toHaveClass(className: string): unknown;
  }
}

// Mock react-hooks
vi.mock('@testing-library/react-hooks', () => ({
  renderHook: vi.fn(),
  act: vi.fn(),
  waitFor: vi.fn(),
}));

// Cleanup after each test case
afterEach(() => {
  cleanup();
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});