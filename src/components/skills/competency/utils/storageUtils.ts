import { CompetencyStorage, StorageValue } from '../types/StorageTypes';

const STORAGE_KEY = 'competency-storage';
const CURRENT_VERSION = 1;

export const getStorageKey = () => STORAGE_KEY;

export const saveToStorage = (roleId: string, state: CompetencyStorage): boolean => {
  try {
    // Get existing storage
    const existingStorage = loadFromStorage();
    
    // Update with new state for this role
    const newStorage: StorageValue = {
      state: {
        ...existingStorage?.state,
        [roleId]: state[roleId]
      },
      version: CURRENT_VERSION
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newStorage));
    console.log('Successfully saved states to storage:', {
      roleId,
      savedState: newStorage.state[roleId]
    });
    return true;
  } catch (error) {
    console.error('Error saving states:', error);
    return false;
  }
};

export const loadFromStorage = (): StorageValue | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (!value) return null;
    return JSON.parse(value) as StorageValue;
  } catch (error) {
    console.error('Error loading states:', error);
    return null;
  }
};

export const loadRoleState = (roleId: string) => {
  const storage = loadFromStorage();
  return storage?.state[roleId] || null;
};