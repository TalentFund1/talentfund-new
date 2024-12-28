import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEmployeeStore } from "../../store/employeeStore";
import { getLevel } from "../../../EmployeeTable";
import { useTrack } from "../../../skills/context/TrackContext";
import { getEmployeeTrack } from "../../utils/employeeTrackUtils";

interface OrganizationFieldsProps {
  formData: {
    office: string;
    department: string;
    manager: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

export const OrganizationFields = ({ formData, handleInputChange }: OrganizationFieldsProps) => {
  const employees = useEmployeeStore((state) => state.employees);
  const { getTrackForRole } = useTrack();
  
  // Filter managers based on both role level (M3-M6) and track being managerial
  const managers = employees.filter(emp => {
    const level = getLevel(emp.role);
    const isManagerialLevel = level && level.startsWith('M');
    const employeeTrack = getEmployeeTrack(emp.role);
    const isManagerialTrack = employeeTrack === "Managerial";
    
    console.log('Checking manager eligibility:', {
      employee: emp.name,
      role: emp.role,
      level,
      isManagerialLevel,
      employeeTrack,
      isManagerialTrack,
      isEligible: isManagerialLevel && isManagerialTrack
    });

    return isManagerialLevel && isManagerialTrack;
  }).map(emp => emp.name);

  console.log('Available managers:', managers);

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Office</label>
        <Select value={formData.office} onValueChange={(value) => handleInputChange('office', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select office" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Toronto">Toronto</SelectItem>
            <SelectItem value="New York">New York</SelectItem>
            <SelectItem value="San Francisco">San Francisco</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Department</label>
        <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Product">Product</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Sales">Sales</SelectItem>
            <SelectItem value="HR">HR</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Manager</label>
        <Select value={formData.manager} onValueChange={(value) => handleInputChange('manager', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select manager" />
          </SelectTrigger>
          <SelectContent>
            {managers.map((manager) => (
              <SelectItem key={manager} value={manager}>
                {manager}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};