import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { getUnifiedSkillData } from "./data/skillDatabaseService";
import { roleSkills } from './data/roleSkills';

export const CompanySkillsTable = () => {
  const { toggledSkills } = useToggledSkills();
  
  console.log('CompanySkillsTable - Current toggled skills:', Array.from(toggledSkills));

  // Get unique skills with their data directly from toggled skills
  const uniqueSkills = Array.from(toggledSkills).map(skillTitle => {
    console.log('Getting data for skill:', skillTitle);
    const skillData = getUnifiedSkillData(skillTitle);
    return {
      ...skillData,
      count: 1 // Each toggled skill counts as 1
    };
  });

  // Helper function to get the type
  const getSkillType = (skillTitle: string): string => {
    for (const role of Object.values(roleSkills)) {
      if (role.specialized?.some(s => s.title === skillTitle)) {
        return 'Specialized';
      }
      if (role.common?.some(s => s.title === skillTitle)) {
        return 'Common';
      }
      if (role.certifications?.some(s => s.title === skillTitle)) {
        return 'Certification';
      }
    }
    return 'Uncategorized';
  };

  console.log('Displaying unique skills:', uniqueSkills);

  return (
    <Card className="p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6">Company Skills</h2>
      <div className="overflow-x-auto">
        <div className="bg-white rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border">
                <TableHead className="font-semibold">Skill Title</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Subcategory</TableHead>
                <TableHead className="font-semibold">Weight</TableHead>
                <TableHead className="font-semibold text-right">Projected Growth</TableHead>
                <TableHead className="font-semibold text-right">Skill Pricer</TableHead>
                <TableHead className="font-semibold text-center">Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uniqueSkills.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                    No skills found. Add skills to see them here.
                  </TableCell>
                </TableRow>
              ) : (
                uniqueSkills.map((skill, index) => (
                  <TableRow key={`${skill.title}-${index}`} className="hover:bg-muted/5">
                    <TableCell className="font-medium">{skill.title}</TableCell>
                    <TableCell>{getSkillType(skill.title)}</TableCell>
                    <TableCell>{skill.businessCategory || 'Information Technology'}</TableCell>
                    <TableCell>{skill.subcategory || 'General'}</TableCell>
                    <TableCell>{skill.weight || 'technical'}</TableCell>
                    <TableCell className="text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm bg-green-100 text-green-800">
                        ↗ {skill.growth || '20%'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{skill.salary || '$150,000'}</TableCell>
                    <TableCell className="text-center">
                      <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-sm ${
                        skill.count > 1 ? 'bg-primary-accent/10 text-primary-accent' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {skill.count}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};