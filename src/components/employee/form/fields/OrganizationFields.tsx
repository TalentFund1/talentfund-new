import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEmployeeStore } from "../../store/employeeStore";

interface OrganizationFieldsProps {
  formData: {
    department: string;
    office: string;
    manager: string;
    team: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

export const OrganizationFields = ({ formData, handleInputChange }: OrganizationFieldsProps) => {
  const employees = useEmployeeStore(state => state.employees);
  
  // Filter managers (employees with M3-M6 roles)
  const managers = employees.filter(emp => {
    const roleLevel = emp.role.split(':')[1]?.trim();
    return roleLevel && roleLevel.startsWith('M');
  });

  console.log('Organization Fields Values:', {
    department: formData.department,
    office: formData.office,
    manager: formData.manager,
    team: formData.team,
    availableManagers: managers.map(m => m.name)
  });

  return (
    <>
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
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Office</label>
        <Select value={formData.office} onValueChange={(value) => handleInputChange('office', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select office" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Toronto">Toronto</SelectItem>
            <SelectItem value="Vancouver">Vancouver</SelectItem>
            <SelectItem value="Montreal">Montreal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Team</label>
        <Select value={formData.team} onValueChange={(value) => handleInputChange('team', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select team" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="RnD">RnD</SelectItem>
            <SelectItem value="Legacy">Legacy</SelectItem>
            <SelectItem value="Mobile">Mobile</SelectItem>
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
              <SelectItem key={manager.id} value={manager.name}>
                {manager.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};