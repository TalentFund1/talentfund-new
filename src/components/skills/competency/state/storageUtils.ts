import { RoleState } from './types';

export const getStorageKey = (roleId: string) => `competency-states-${roleId}`;

export const loadRoleState = (roleId: string): RoleState => {
  try {
    const key = getStorageKey(roleId);
    const savedState = localStorage.getItem(key);
    if (savedState) {
      console.log(`Loading saved state for role ${roleId}:`, JSON.parse(savedState));
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error(`Error loading state for role ${roleId}:`, error);
  }
  return {};
};

export const saveRoleState = (roleId: string, state: RoleState) => {
  try {
    const key = getStorageKey(roleId);
    console.log(`Saving state for role ${roleId}:`, state);
    localStorage.setItem(key, JSON.stringify(state));
  } catch (error) {
    console.error(`Error saving state for role ${roleId}:`, error);
  }
};