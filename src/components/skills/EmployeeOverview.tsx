import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export const EmployeeOverview = () => {
  const employees = [
    {
      section: "People with this job",
      people: [
        { name: "Jeffrey Smith", role: "AI Engineer: P4", match: "89%", image: "photo-1488590528505-98d2b5aba04b" },
        { name: "Ron Panak", role: "AI Engineer: P5", match: "89%", image: "photo-1518770660439-4636190af475" },
      ]
    },
    {
      section: "People with skills that match this job",
      people: [
        { name: "Kate Simba", role: "Backend Engineer: P4", match: "85%", image: "photo-1461749280684-dccba630e2f6" },
        { name: "Mike Peterson", role: "Full-stack Engineer: P5", match: "85%", image: "photo-1486312338219-ce68d2c6f44d" },
        { name: "Imran Valid", role: "AI Engineer: P5", match: "85%", image: "photo-1488590528505-98d2b5aba04b" },
      ]
    }
  ];

  return (
    <Card className="p-6 space-y-6 animate-fade-in bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary">Employees</h2>
        <span className="text-sm text-muted-foreground">5 total</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {employees.map((section) => (
          <div key={section.section} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-primary">{section.section}</h3>
              <button className="text-sm text-primary-accent hover:text-primary-accent/80 transition-colors">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {section.people.map((person) => (
                <div 
                  key={person.name} 
                  className="flex items-center gap-4 hover:bg-secondary/50 p-2 rounded-lg transition-colors cursor-pointer"
                >
                  <Avatar className="h-10 w-10 border-2 border-border">
                    <img 
                      src={`https://images.unsplash.com/${person.image}?auto=format&fit=crop&w=96&h=96`}
                      alt={person.name}
                      className="object-cover"
                    />
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-primary">{person.name}</p>
                    <p className="text-sm text-muted-foreground">{person.role}</p>
                  </div>
                  <span className="text-sm px-2.5 py-1 bg-green-100 text-green-800 rounded-full">
                    {person.match}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};