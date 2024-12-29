import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Heart } from "lucide-react";

interface MatchesSectionProps {
  selectedEmployees: string[];
  onEmployeeSelect: (employeeName: string) => void;
}

const SkillBadge = ({ name, level }: { name: string; level: string }) => {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return 'bg-primary';
      case 'intermediate':
        return 'bg-orange-500';
      case 'beginner':
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F7F9FF] rounded-lg border border-[#E5E7EB] text-sm text-primary">
      <span>{name}</span>
      <div className="flex items-center gap-1.5">
        <div className={`h-2 w-2 rounded-full ${getLevelColor(level)}`} />
        <Heart className="w-3.5 h-3.5 text-[#1f2144]" />
      </div>
    </div>
  );
};

export const MatchesSection = ({
  selectedEmployees,
  onEmployeeSelect
}: MatchesSectionProps) => {
  // Mock data for demonstration - replace with actual data later
  const matchedEmployees = [
    {
      id: 1,
      name: "Victor Smith",
      role: "AI Engineer: P4",
      skillMatch: "3/4",
      skills: [
        { name: "Deep Learning", level: "advanced" },
        { name: "Natural Language Processing", level: "intermediate" },
        { name: "Database Design", level: "beginner" }
      ],
      adjacentSkills: [
        { name: "Machine Learning", level: "advanced" },
        { name: "Computer Vision", level: "intermediate" },
        { name: "TensorFlow", level: "intermediate" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-primary">4. Review your Matches</h2>
        <p className="text-sm text-primary/60 mt-1">Find the perfect team members for your project.</p>
      </div>

      <ScrollArea className="rounded-lg border border-[#E5E7EB] bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-[#E5E7EB]">
              <TableHead className="w-[250px] py-4 text-sm font-medium text-muted-foreground">
                Employee Name
              </TableHead>
              <TableHead className="w-[200px] py-4 text-sm font-medium text-muted-foreground">
                Current Role
              </TableHead>
              <TableHead className="w-[100px] text-center py-4 text-sm font-medium text-muted-foreground">
                Skill Match
              </TableHead>
              <TableHead className="w-[400px] py-4 text-sm font-medium text-muted-foreground">
                Skills
              </TableHead>
              <TableHead className="w-[400px] py-4 text-sm font-medium text-muted-foreground">
                Adjacent Skills
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matchedEmployees.map((employee) => (
              <TableRow key={employee.id} className="group hover:bg-muted/50">
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=32&h=32`}
                      alt={employee.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-primary hover:text-primary-accent transition-colors text-sm font-medium">
                      {employee.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <span className="text-sm text-primary hover:text-primary-accent transition-colors">
                    {employee.role}
                  </span>
                </TableCell>
                <TableCell className="text-center py-4">
                  <span className="text-sm text-muted-foreground font-medium">
                    {employee.skillMatch}
                  </span>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex flex-wrap gap-2">
                    {employee.skills.map((skill) => (
                      <SkillBadge 
                        key={skill.name} 
                        name={skill.name} 
                        level={skill.level} 
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex flex-wrap gap-2">
                    {employee.adjacentSkills.map((skill) => (
                      <SkillBadge 
                        key={skill.name} 
                        name={skill.name} 
                        level={skill.level} 
                      />
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};