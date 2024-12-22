import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { getUnifiedSkillData } from "./data/skillDatabaseService";
import { roleSkills } from './data/roleSkills';

export const CompanySkillsTable = () => {
  const { toggledSkills } = useToggledSkills();
  
  console.log('CompanySkillsTable - Current toggled skills:', {
    toggledSkillsCount: toggledSkills.size,
    toggledSkills: Array.from(toggledSkills)
  });
  
  // Get unique skills with their counts, but only for toggled skills
  const uniqueSkills = Array.from(toggledSkills)
    .map(skillTitle => {
      console.log('Getting data for toggled skill:', skillTitle);
      return getUnifiedSkillData(skillTitle);
    })
    .filter(skill => skill !== undefined); // Filter out any undefined skills

  // Helper function to get the type
  const getSkillType = (skillTitle: string): string => {
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

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'specialized':
        return 'bg-blue-100 text-blue-800';
      case 'certification':
        return 'bg-purple-100 text-purple-800';
      case 'common':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  console.log('CompanySkillsTable - Displaying filtered skills:', uniqueSkills);

  return (
    <Card className="p-6 bg-white">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold">Company Skills</h2>
        <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
          {uniqueSkills.length}
        </span>
      </div>
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
              {uniqueSkills.map((skill) => {
                const skillType = getSkillType(skill.title);
                return (
                  <TableRow key={skill.id} className="hover:bg-muted/5">
                    <TableCell className="font-medium">{skill.title}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm ${getTypeColor(skillType)}`}>
                        {skillType}
                      </span>
                    </TableCell>
                    <TableCell>{skill.businessCategory}</TableCell>
                    <TableCell>{skill.subcategory}</TableCell>
                    <TableCell>{skill.weight}</TableCell>
                    <TableCell className="text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm bg-green-100 text-green-800">
                        ↗ {skill.growth}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{skill.salary}</TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-sm bg-gray-100 text-gray-800">
                        1
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};