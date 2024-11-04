import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export const EmployeeOverview = () => {
  const employees = [
    {
      section: "People with this job",
      people: [
        { name: "Jeffrey Smith", role: "AI Engineer: P4", match: "89%" },
        { name: "Ron Panak", role: "AI Engineer: P5", match: "89%" },
      ]
    },
    {
      section: "People with skills that match this job",
      people: [
        { name: "Kate Simba", role: "Backend Engineer: P4", match: "89%" },
        { name: "Mike Peterson", role: "Full-stack Engineer: P5", match: "89%" },
        { name: "Imran Valid", role: "AI Engineer: P5", match: "89%" },
      ]
    }
  ];

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-lg font-semibold">Employees</h2>
      <div className="grid grid-cols-2 gap-8 border-t pt-4">
        {employees.map((section) => (
          <div key={section.section} className="space-y-4">
            <h3 className="font-medium">{section.section}</h3>
            <div className="space-y-4">
              {section.people.map((person) => (
                <div key={person.name} className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <img 
                      src={`https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=96&h=96`}
                      alt={person.name}
                      className="object-cover"
                    />
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{person.name}</p>
                    <p className="text-sm text-muted-foreground">{person.role}</p>
                  </div>
                  <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full">
                    {person.match}
                  </span>
                </div>
              ))}
            </div>
            <button className="text-sm text-primary-accent hover:text-primary-accent/80 transition-colors">
              View all
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};