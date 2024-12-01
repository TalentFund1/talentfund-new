import { Employee } from "../../types/employeeTypes";
import { getSkillProfileId } from '@/utils/roleUtils';
import { processEmployeeSkills } from "../utils/skillProcessing";

interface FormData {
  employeeId: string;
  skills: string;
  role: string;
}

export const handleEmployeeFormSubmission = (formData: FormData) => {
  const { employeeId, skills, role } = formData;
  const { skillsList, categorizedSkills } = processEmployeeSkills(skills, role);
  
  // Additional logic for handling form submission could go here
  console.log('Processed Employee Form Submission:', {
    employeeId,
    skillsList,
    categorizedSkills,
    role,
  });

  // Returning processed data for further use
  return { employeeId, skillsList, categorizedSkills };
};
