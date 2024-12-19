import { RoleState } from '../types/competencyTypes';

const STORAGE_PREFIX = 'competency-state';

export const getStorageKey = (roleId: string, employeeId: string) => 
  `${STORAGE_PREFIX}-${roleId}-${employeeId}`;

export const loadPersistedState = (roleId: string, employeeId: string): RoleState | null => {
  try {
    const storageKey = getStorageKey(roleId, employeeId);
    const savedState = localStorage.getItem(storageKey);
    console.log('Loading persisted state for role and employee:', { roleId, employeeId });
    
    if (savedState) {
      const parsed = JSON.parse(savedState);
      console.log('Successfully loaded persisted state:', parsed);
      return parsed;
    }
  } catch (error) {
    console.error('Error loading persisted state:', error);
  }
  return null;
};

export const persistState = (roleId: string, employeeId: string, state: RoleState): void => {
  try {
    const storageKey = getStorageKey(roleId, employeeId);
    console.log('Persisting state for role and employee:', { roleId, employeeId, state });
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch (error) {
    console.error('Error persisting state:', error);
  }
};