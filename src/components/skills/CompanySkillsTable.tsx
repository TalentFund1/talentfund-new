import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { getUnifiedSkillData } from "./data/centralSkillsDatabase";

export const CompanySkillsTable = () => {
  const { toggledSkills } = useToggledSkills();
  
  // Convert Set to Array and map to get full skill data
  const skills = Array.from(toggledSkills).map(skillTitle => {
    console.log('Getting data for toggled skill:', skillTitle);
    return getUnifiedSkillData(skillTitle);
  });

  console.log('Displaying toggled skills:', skills);

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Company Skills</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Skill Title</TableHead>
              <TableHead className="font-semibold">Subcategory</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Type</TableHead>
              <TableHead className="font-semibold">Weight</TableHead>
              <TableHead className="font-semibold text-right">Projected Growth</TableHead>
              <TableHead className="font-semibold text-right">Skill Pricer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.map((skill, index) => (
              <TableRow key={skill.title} className={index % 2 === 0 ? "bg-muted/5" : ""}>
                <TableCell className="font-medium">{skill.title}</TableCell>
                <TableCell>{skill.subcategory}</TableCell>
                <TableCell>{skill.type}</TableCell>
                <TableCell>{skill.type === 'critical' ? 'Specialized' : skill.type === 'technical' ? 'Common' : 'Certification'}</TableCell>
                <TableCell>{skill.type === 'critical' ? 'Critical' : 'Standard'}</TableCell>
                <TableCell className="text-right">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm bg-green-100 text-green-800">
                    ↗ {skill.growth}
                  </span>
                </TableCell>
                <TableCell className="text-right">{skill.salary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};