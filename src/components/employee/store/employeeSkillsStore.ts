import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkillsStore } from './types/skillStoreTypes';
import { createSkillActions } from './actions/skillActions';
import { createSkillSelectors } from './selectors/skillSelectors';
import { useEmployeeStore } from './employeeStore';
import { getSkillProfileId } from '../../EmployeeTable';
import { roleSkills } from '../../skills/data/roleSkills';

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      employeeSkills: {},
      ...createSkillActions(set, get),
      ...createSkillSelectors(get),

      initializeEmployeeSkills: (employeeId: string) => {
        console.log('Starting safe initialization for employee:', employeeId);
        
        const currentState = get().employeeSkills[employeeId];
        if (currentState) {
          console.log('Skills already initialized for employee:', employeeId);
          return;
        }

        // Get employee role to initialize correct skills
        const employee = useEmployeeStore.getState().getEmployeeById(employeeId);
        if (!employee) {
          console.warn('No employee found for initialization:', employeeId);
          return;
        }

        const roleId = getSkillProfileId(employee.role);
        const roleData = roleSkills[roleId];
        
        if (!roleData) {
          console.warn('No role data found for:', { roleId, role: employee.role });
          return;
        }

        // Combine all skills from role
        const allRoleSkills = [
          ...(roleData.specialized || []),
          ...(roleData.common || []),
          ...(roleData.certifications || [])
        ];

        console.log('Initializing skills from role:', {
          employeeId,
          role: employee.role,
          skillCount: allRoleSkills.length
        });

        // Initialize with role-specific skills and empty states
        set(state => {
          const initialStates = {};
          allRoleSkills.forEach(skill => {
            initialStates[skill.title] = {
              level: 'unspecified',
              requirement: 'unknown',
              lastUpdated: new Date().toISOString()
            };
          });

          console.log('Creating new employee skills state:', {
            employeeId,
            skillCount: allRoleSkills.length,
            stateCount: Object.keys(initialStates).length
          });

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                employeeId,
                skills: allRoleSkills,
                states: initialStates,
                lastUpdated: new Date().toISOString()
              }
            }
          };
        });
      },

      batchUpdateSkills: (employeeId: string, updates: Record<string, any>) => {
        console.log('Batch updating skills for employee:', {
          employeeId,
          updateCount: Object.keys(updates).length,
          timestamp: new Date().toISOString()
        });

        set(state => {
          const currentSkills = state.employeeSkills[employeeId] || {};
          const updatedSkills = {
            ...currentSkills,
            ...updates,
            lastUpdated: new Date().toISOString()
          };

          const newState = {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: updatedSkills
            }
          };

          console.log('State updated successfully:', {
            employeeId,
            skillCount: Object.keys(updatedSkills).length,
            timestamp: updatedSkills.lastUpdated
          });

          return newState;
        });
      }
    }),
    {
      name: 'employee-skills-storage',
      version: 9, // Incrementing version to ensure clean state
      partialize: (state) => ({
        employeeSkills: state.employeeSkills
      })
    }
  )
);