import { RoleState } from '../types/competencyTypes';

const STORAGE_PREFIX = 'competency-state';

export const getStorageKey = (roleId: string, employeeId?: string) => {
  if (employeeId) {
    return `${STORAGE_PREFIX}-employee-${employeeId}-${roleId}`;
  }
  return `${STORAGE_PREFIX}-${roleId}`;
};

export const loadPersistedState = (roleId: string, employeeId?: string): RoleState | null => {
  try {
    const storageKey = getStorageKey(roleId, employeeId);
    const savedState = localStorage.getItem(storageKey);
    console.log('Loading persisted state:', { roleId, employeeId, storageKey });
    
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

export const persistState = (roleId: string, state: RoleState, employeeId?: string): void => {
  try {
    const storageKey = getStorageKey(roleId, employeeId);
    console.log('Persisting state:', { roleId, employeeId, state });
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch (error) {
    console.error('Error persisting state:', error);
  }
};