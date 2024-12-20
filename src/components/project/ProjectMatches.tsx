import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ProjectMatchesProps {
  selectedRoles: string[];
  roleSkills: Record<string, string[]>;
  onNext: () => void;
  onBack: () => void;
}

export const ProjectMatches = ({ 
  selectedRoles, 
  roleSkills, 
  onNext, 
  onBack 
}: ProjectMatchesProps) => {
  // Mock data for demonstration
  const matches = selectedRoles.map(role => ({
    role,
    skills: roleSkills[role] || [],
    matches: Math.floor(Math.random() * 10) + 1,
    topMatch: {
      name: "John Doe",
      matchPercentage: Math.floor(Math.random() * 30) + 70
    }
  }));

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-medium">4. Review Matches</h2>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Required Skills</TableHead>
              <TableHead className="text-right">Matches</TableHead>
              <TableHead className="text-right">Top Match</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.map(match => (
              <TableRow key={match.role}>
                <TableCell className="font-medium">{match.role}</TableCell>
                <TableCell>{match.skills.join(", ")}</TableCell>
                <TableCell className="text-right">{match.matches}</TableCell>
                <TableCell className="text-right">
                  {match.topMatch.name} ({match.topMatch.matchPercentage}%)
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};