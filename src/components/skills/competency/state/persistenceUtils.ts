import { RoleState } from './types';

const STORAGE_PREFIX = 'competency-state';

export const getStorageKey = (roleId: string) => `${STORAGE_PREFIX}-${roleId}`;

export const loadPersistedState = (roleId: string): RoleState | null => {
  try {
    const storageKey = getStorageKey(roleId);
    const savedState = localStorage.getItem(storageKey);
    console.log('Loading persisted state for role:', roleId);
    
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

export const persistState = (roleId: string, state: RoleState): void => {
  try {
    const storageKey = getStorageKey(roleId);
    console.log('Persisting state for role:', roleId, state);
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch (error) {
    console.error('Error persisting state:', error);
  }
};