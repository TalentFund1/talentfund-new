import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { getUnifiedSkillData } from "./data/centralSkillsDatabase";

export const CompanySkillsTable = () => {
  const { toggledSkills } = useToggledSkills();
  
  console.log('Rendering CompanySkillsTable with toggled skills:', Array.from(toggledSkills));

  if (toggledSkills.size === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Company Skills</h2>
        <p className="text-muted-foreground">No skills have been toggled on yet.</p>
      </div>
    );
  }

  const skillsData = Array.from(toggledSkills).map(skillTitle => {
    const skillData = getUnifiedSkillData(skillTitle);
    return {
      title: skillTitle,
      subcategory: skillData.subcategory,
      category: skillData.category || 'common',
      type: skillData.type || 'technical',
      occupation: skillData.occupation || 'Software Developer', // Default occupation if not specified
      growth: skillData.growth,
      salary: skillData.salary
    };
  });

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Company Skills</h2>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Skill Title</TableHead>
              <TableHead className="w-[200px]">Subcategory</TableHead>
              <TableHead className="w-[150px]">Category</TableHead>
              <TableHead className="w-[150px]">Type</TableHead>
              <TableHead className="w-[200px]">Occupation</TableHead>
              <TableHead className="w-[150px] text-right">Projected Growth</TableHead>
              <TableHead className="w-[150px] text-right">Skill Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skillsData.map((skill) => (
              <TableRow key={skill.title}>
                <TableCell className="font-medium">{skill.title}</TableCell>
                <TableCell>{skill.subcategory}</TableCell>
                <TableCell className="capitalize">{skill.category}</TableCell>
                <TableCell className="capitalize">{skill.type}</TableCell>
                <TableCell>{skill.occupation}</TableCell>
                <TableCell className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
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
  );
};