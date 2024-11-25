import { roleSkills } from "../components/skills/data/roleSkills";
import { initialSkills } from "../components/benchmark/skills-matrix/initialSkills";
import { useCompetencyStore } from "../components/skills/competency/CompetencyState";

interface ProfileData {
  id: string;
  name: string;
  specialized: any[];
  common: any[];
  certifications: any[];
}

export const validateProfileData = (profileId: string): boolean => {
  console.log('Validating profile data for ID:', profileId);
  
  // Check if profile exists in roleSkills
  const hasRoleSkills = roleSkills.hasOwnProperty(profileId);
  console.log('Has role skills:', hasRoleSkills);
  
  // Check if profile exists in initialSkills
  const hasInitialSkills = initialSkills.hasOwnProperty(profileId);
  console.log('Has initial skills:', hasInitialSkills);
  
  // Check if competency states are initialized
  const competencyStates = useCompetencyStore.getState().currentStates[profileId];
  const hasCompetencyStates = !!competencyStates;
  console.log('Has competency states:', hasCompetencyStates);

  return hasRoleSkills && hasInitialSkills && hasCompetencyStates;
};

export const duplicateProfileData = (sourceId: string, targetId: string, profileName: string): boolean => {
  console.log('Duplicating profile data:', { sourceId, targetId, profileName });
  
  try {
    // 1. Duplicate role skills
    if (roleSkills[sourceId]) {
      roleSkills[targetId] = {
        specialized: [...roleSkills[sourceId].specialized],
        common: [...roleSkills[sourceId].common],
        certifications: [...roleSkills[sourceId].certifications]
      };
    }

    // 2. Duplicate initial skills
    if (initialSkills[sourceId]) {
      initialSkills[targetId] = [...initialSkills[sourceId]];
    }

    // 3. Duplicate competency states
    const competencyStore = useCompetencyStore.getState();
    if (competencyStore.currentStates[sourceId]) {
      competencyStore.initializeStates(targetId);
      const sourceStates = competencyStore.currentStates[sourceId];
      competencyStore.currentStates[targetId] = { ...sourceStates };
    }

    console.log('Successfully duplicated profile data for:', targetId);
    return true;
  } catch (error) {
    console.error('Error duplicating profile data:', error);
    return false;
  }
};

export const createNewProfile = (
  profileData: ProfileData,
  sourceProfileId?: string
): boolean => {
  console.log('Creating new profile:', profileData);
  
  try {
    if (sourceProfileId) {
      // Duplicate existing profile data
      return duplicateProfileData(sourceProfileId, profileData.id, profileData.name);
    } else {
      // Create new profile from scratch
      roleSkills[profileData.id] = {
        specialized: profileData.specialized,
        common: profileData.common,
        certifications: profileData.certifications
      };

      // Initialize empty skills
      initialSkills[profileData.id] = [];

      // Initialize competency states
      useCompetencyStore.getState().initializeStates(profileData.id);

      console.log('Successfully created new profile:', profileData.id);
      return true;
    }
  } catch (error) {
    console.error('Error creating new profile:', error);
    return false;
  }
};