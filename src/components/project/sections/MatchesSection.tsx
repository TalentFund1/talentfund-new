import { Badge } from "@/components/ui/badge";
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
    <Badge 
      variant="outline" 
      className="bg-[#F7F9FF] text-primary border-[#E5E7EB] hover:bg-[#F7F9FF]/80 flex items-center gap-1.5 px-3 py-1.5 h-8 text-sm rounded-md"
    >
      {name}
      <div className="flex items-center gap-1.5">
        <div className={`h-2 w-2 rounded-full ${getLevelColor(level)}`} />
        <Heart className="w-3 h-3 text-[#1f2144]" />
      </div>
    </Badge>
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-primary">4. Review your Matches</h2>
          <p className="text-sm text-primary/60">Find the perfect team members for your project.</p>
        </div>
      </div>

      <ScrollArea className="h-[300px] rounded-lg border border-border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-background/40">
              <TableHead className="w-[48px]"></TableHead>
              <TableHead className="w-[400px]">Employee Name</TableHead>
              <TableHead className="w-[350px]">Current Role</TableHead>
              <TableHead className="w-[120px] text-center">Skill Match</TableHead>
              <TableHead className="w-[350px]">Skills</TableHead>
              <TableHead className="w-[350px]">Adjacent Skills</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matchedEmployees.map((employee) => (
              <TableRow key={employee.id} className="group hover:bg-muted/50">
                <TableCell>
                  <input 
                    type="checkbox" 
                    checked={selectedEmployees.includes(employee.name)}
                    onChange={() => onEmployeeSelect(employee.name)}
                    className="rounded border-gray-300"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img 
                      src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=24&h=24`}
                      alt={employee.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-primary hover:text-primary-accent transition-colors text-sm">
                      {employee.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-primary hover:text-primary-accent transition-colors">
                    {employee.role}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-sm text-muted-foreground font-medium">
                    {employee.skillMatch}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2 min-w-[250px]">
                    {employee.skills.map((skill) => (
                      <SkillBadge 
                        key={skill.name} 
                        name={skill.name} 
                        level={skill.level} 
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2 min-w-[250px]">
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