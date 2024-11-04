import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const EMPLOYEE_IMAGES = [
  "photo-1488590528505-98d2b5aba04b",
  "photo-1518770660439-4636190af475",
  "photo-1461749280684-dccba630e2f6",
  "photo-1486312338219-ce68d2c6f44d"
];

export const EmployeeOverview = () => {
  const employees = [
    {
      section: "People with this job",
      people: [
        { name: "Jeffrey Smith", role: "AI Engineer: P4", match: "89%", image: EMPLOYEE_IMAGES[0] },
        { name: "Ron Panak", role: "AI Engineer: P5", match: "89%", image: EMPLOYEE_IMAGES[1] },
      ]
    },
    {
      section: "People with skills that match this job",
      people: [
        { name: "Kate Simba", role: "Backend Engineer: P4", match: "89%", image: EMPLOYEE_IMAGES[2] },
        { name: "Mike Peterson", role: "Full-stack Engineer: P5", match: "89%", image: EMPLOYEE_IMAGES[3] },
        { name: "Imran Valid", role: "AI Engineer: P5", match: "89%", image: EMPLOYEE_IMAGES[0] },
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {employees.map((section) => (
        <Card key={section.section} className="p-6 space-y-4">
          <h3 className="text-base font-medium">{section.section}</h3>
          <div className="space-y-4">
            {section.people.map((person) => (
              <div 
                key={person.name} 
                className="flex items-center gap-3 hover:bg-secondary/50 rounded-lg transition-colors cursor-pointer"
              >
                <Avatar className="h-10 w-10">
                  <img 
                    src={`https://images.unsplash.com/${person.image}?auto=format&fit=crop&w=96&h=96`}
                    alt={person.name}
                    className="object-cover"
                  />
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{person.name}</p>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                </div>
                <span className="text-sm px-2.5 py-1 bg-green-100 text-green-800 rounded-full">
                  {person.match}
                </span>
              </div>
            ))}
            <a 
              href="#" 
              className="block text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            >
              View all
            </a>
          </div>
        </Card>
      ))}
    </div>
  );
};