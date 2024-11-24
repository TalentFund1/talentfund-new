import { CompetencyState, StorageValue } from '../types/CompetencyTypes';

export const getStorageKey = (roleId: string) => `competency-states-${roleId}`;

export const saveToStorage = (storageKey: string, value: StorageValue<CompetencyState>) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(value));
    console.log('Successfully saved states to storage:', {
      storageKey,
      savedState: value.state.currentStates
    });
    return true;
  } catch (error) {
    console.error('Error saving states:', error);
    return false;
  }
};

export const loadFromStorage = (storageKey: string): StorageValue<CompetencyState> | null => {
  try {
    const value = localStorage.getItem(storageKey);
    if (!value) return null;
    return JSON.parse(value) as StorageValue<CompetencyState>;
  } catch (error) {
    console.error('Error loading states:', error);
    return null;
  }
};