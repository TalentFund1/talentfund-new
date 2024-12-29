import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { getUnifiedSkillData } from "./data/skillDatabaseService";
import { roleSkills } from "./data/roleSkills";

export const CompanySkillsTable = () => {
  const { toggledSkills } = useToggledSkills();
  
  console.log('CompanySkillsTable - Current toggled skills:', {
    toggledSkillsCount: toggledSkills.size,
    toggledSkills: Array.from(toggledSkills)
  });

  // Get all role skills first
  const allRoleSkills = Object.values(roleSkills).reduce((acc, role) => {
    const roleSkillsList = [
      ...role.specialized,
      ...role.common,
      ...role.certifications
    ];
    roleSkillsList.forEach(skill => {
      if (!acc.some(s => s.title === skill.title)) {
        acc.push(skill);
      }
    });
    return acc;
  }, []);

  // Get all toggled skills and enrich them with universal database data
  const uniqueSkills = Array.from(toggledSkills)
    .map(skillTitle => {
      console.log('Getting data for toggled skill:', skillTitle);
      const roleSkill = allRoleSkills.find(rs => rs.title === skillTitle);
      const unifiedData = getUnifiedSkillData(skillTitle);
      
      // Merge role skill data with unified data if available
      return roleSkill ? {
        ...unifiedData,
        ...roleSkill,
        id: unifiedData.id || roleSkill.id
      } : unifiedData;
    })
    .filter(skill => skill !== undefined);

  console.log('CompanySkillsTable - Enriched skills:', {
    totalFiltered: uniqueSkills.length,
    sample: uniqueSkills.slice(0, 3)
  });

  // Helper function to get the type color
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

  // Helper function to get the weight color
  const getWeightColor = (weight: string) => {
    switch (weight.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'technical':
        return 'bg-blue-100 text-blue-800';
      case 'necessary':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
                <TableHead className="font-semibold">Skill ID</TableHead>
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
              {uniqueSkills.map((skill) => (
                <TableRow key={skill.id} className="hover:bg-muted/5">
                  <TableCell className="font-medium">{skill.title}</TableCell>
                  <TableCell>{skill.id}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm ${getTypeColor(skill.category)}`}>
                      {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{skill.businessCategory}</TableCell>
                  <TableCell>{skill.subcategory}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm ${getWeightColor(skill.weight)}`}>
                      {skill.weight.charAt(0).toUpperCase() + skill.weight.slice(1)}
                    </span>
                  </TableCell>
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
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};