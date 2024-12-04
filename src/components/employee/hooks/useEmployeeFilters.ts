import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useEmployeeFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize state from URL parameters
  const [selectedDepartment, setSelectedDepartment] = useState<string[]>(
    searchParams.get('department')?.split(',').filter(Boolean) || []
  );
  const [selectedLevel, setSelectedLevel] = useState<string[]>(
    searchParams.get('level')?.split(',').filter(Boolean) || []
  );
  const [selectedOffice, setSelectedOffice] = useState<string[]>(
    searchParams.get('office')?.split(',').filter(Boolean) || []
  );
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string[]>(
    searchParams.get('employmentType')?.split(',').filter(Boolean) || []
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    searchParams.get('skills')?.split(',').filter(Boolean) || []
  );
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>(
    searchParams.get('employees')?.split(',').filter(Boolean) || []
  );
  const [selectedManager, setSelectedManager] = useState<string[]>(
    searchParams.get('manager')?.split(',').filter(Boolean) || []
  );
  const [selectedRole, setSelectedRole] = useState<string[]>(
    searchParams.get('role')?.split(',').filter(Boolean) || []
  );

  // Update URL parameters when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedDepartment.length) params.set('department', selectedDepartment.join(','));
    if (selectedLevel.length) params.set('level', selectedLevel.join(','));
    if (selectedOffice.length) params.set('office', selectedOffice.join(','));
    if (selectedEmploymentType.length) params.set('employmentType', selectedEmploymentType.join(','));
    if (selectedSkills.length) params.set('skills', selectedSkills.join(','));
    if (selectedEmployees.length) params.set('employees', selectedEmployees.join(','));
    if (selectedManager.length) params.set('manager', selectedManager.join(','));
    if (selectedRole.length) params.set('role', selectedRole.join(','));

    setSearchParams(params, { replace: true });
  }, [
    selectedDepartment,
    selectedLevel,
    selectedOffice,
    selectedEmploymentType,
    selectedSkills,
    selectedEmployees,
    selectedManager,
    selectedRole,
    setSearchParams
  ]);

  return {
    selectedDepartment,
    setSelectedDepartment,
    selectedLevel,
    setSelectedLevel,
    selectedOffice,
    setSelectedOffice,
    selectedEmploymentType,
    setSelectedEmploymentType,
    selectedSkills,
    setSelectedSkills,
    selectedEmployees,
    setSelectedEmployees,
    selectedManager,
    setSelectedManager,
    selectedRole,
    setSelectedRole
  };
};