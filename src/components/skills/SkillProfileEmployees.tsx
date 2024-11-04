import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export const SkillProfileEmployees = () => {
  const employees = [
    { name: "Jeffrey Smith", role: "AI Engineer: P4", match: "89%", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=32&h=32" },
    { name: "Ron Panek", role: "AI Engineer: P5", match: "89%", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=32&h=32" },
    { name: "Kate Simbe", role: "Backend Engineer: P4", match: "85%", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=32&h=32" },
    { name: "Mike Peterson", role: "Full-stack Engineer: P5", match: "85%", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=32&h=32" },
    { name: "Imran Valid", role: "AI Engineer: P5", match: "85%", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=32&h=32" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-8">
        <Card className="p-6 space-y-4">
          <h3 className="font-medium">People with this job</h3>
          <div className="space-y-3">
            {employees.slice(0, 2).map((employee) => (
              <div key={employee.name} className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <Avatar className="h-10 w-10">
                  <img src={employee.image} alt={employee.name} className="object-cover" />
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
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-medium">People with skills that match this job</h3>
          <div className="space-y-3">
            {employees.slice(2).map((employee) => (
              <div key={employee.name} className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <Avatar className="h-10 w-10">
                  <img src={employee.image} alt={employee.name} className="object-cover" />
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
        </Card>
      </div>
    </div>
  );
};