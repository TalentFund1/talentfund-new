import { create } from 'zustand';

interface BenchmarkSkillsMatrixState {
  visibleItems: number;
  setVisibleItems: (count: number) => void;
}

export const useBenchmarkSkillsMatrixState = create<BenchmarkSkillsMatrixState>((set) => ({
  visibleItems: 10,
  setVisibleItems: (count) => set({ visibleItems: count }),
}));