import { create } from 'zustand';

interface BenchmarkSkillsMatrixState {
  visibleItems: number;
  currentPage: number;
  setVisibleItems: (count: number) => void;
  setCurrentPage: (page: number) => void;
}

export const useBenchmarkSkillsMatrixState = create<BenchmarkSkillsMatrixState>((set) => ({
  visibleItems: 50,
  currentPage: 1,
  setVisibleItems: (count) => set({ visibleItems: count, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));