import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { getUnifiedSkillData } from "./data/centralSkillsDatabase";
import { roleSkills } from './data/roleSkills';

export const CompanySkillsTable = () => {
  const { toggledSkills } = useToggledSkills();
  
  // Convert Set to Array and map to get full skill data
  const skills = Array.from(toggledSkills).map(skillTitle => {
    console.log('Getting data for toggled skill:', skillTitle);
    return getUnifiedSkillData(skillTitle);
  });

  // Helper function to get the type
  const getSkillType = (skillTitle: string): string => {
    // Check in roleSkills to determine the type
    for (const role of Object.values(roleSkills)) {
      if (role.specialized.some(s => s.title === skillTitle)) {
        return 'Specialized';
      }
      if (role.common.some(s => s.title === skillTitle)) {
        return 'Common';
      }
      if (role.certifications.some(s => s.title === skillTitle)) {
        return 'Certification';
      }
    }
    return 'Uncategorized';
  };

  console.log('Displaying toggled skills:', skills);

  return (
    <Card className="p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6">Company Skills</h2>
      <div className="overflow-x-auto">
        <div className="bg-white rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Skill Title</TableHead>
                <TableHead className="font-semibold">Subcategory</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Weight</TableHead>
                <TableHead className="font-semibold text-right">Projected Growth</TableHead>
                <TableHead className="font-semibold text-right">Skill Pricer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skills.map((skill, index) => (
                <TableRow key={`${skill.title}-${index}`} className={index % 2 === 0 ? "bg-muted/5" : ""}>
                  <TableCell className="font-medium">{skill.title}</TableCell>
                  <TableCell>{skill.subcategory}</TableCell>
                  <TableCell>{getSkillType(skill.title)}</TableCell>
                  <TableCell>{skill.weight}</TableCell>
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
      </div>
    </Card>
  );
};