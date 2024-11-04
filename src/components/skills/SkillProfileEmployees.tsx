import { Avatar } from "@/components/ui/avatar";

export const SkillProfileEmployees = () => {
  const employees = [
    { name: "Jeffrey Smith", role: "AI Engineer: P4", match: "89%" },
    { name: "Ron Panek", role: "AI Engineer: P5", match: "89%" },
    { name: "Kate Simbe", role: "Backend Engineer: P4", match: "85%" },
    { name: "Mike Peterson", role: "Full-stack Engineer: P5", match: "85%" },
    { name: "Imran Valid", role: "AI Engineer: P5", match: "85%" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-medium">People with this job</h3>
          <div className="space-y-3">
            {employees.slice(0, 2).map((employee) => (
              <div key={employee.name} className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.name}`} alt={employee.name} />
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{employee.name}</p>
                  <p className="text-sm text-muted-foreground">{employee.role}</p>
                </div>
                <span className="ml-auto text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {employee.match}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">People with skills that match this job</h3>
          <div className="space-y-3">
            {employees.slice(2).map((employee) => (
              <div key={employee.name} className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.name}`} alt={employee.name} />
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{employee.name}</p>
                  <p className="text-sm text-muted-foreground">{employee.role}</p>
                </div>
                <span className="ml-auto text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {employee.match}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};