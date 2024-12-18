import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { getUnifiedSkillData } from "./data/skillDatabaseService";
import { useEmployeeStore } from "../employee/store/employeeStore";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { categorizeSkill } from "./competency/skillCategories";
import { useParams } from "react-router-dom";

export const EmployeeSkillsTable = () => {
  const { toggledSkills } = useToggledSkills();
  const employees = useEmployeeStore((state) => state.employees);
  const { id: roleId } = useParams();
  
  // Get all employee skills
  const allEmployeeSkills = employees.flatMap(employee => {
    const skills = getEmployeeSkills(employee.id);
    return skills.map(skill => ({
      ...skill,
      employeeName: employee.name,
      category: categorizeSkill(skill.title, roleId || "123") // Properly categorize each skill
    }));
  });

  // Count occurrences of each skill
  const skillCounts = allEmployeeSkills.reduce((acc, skill) => {
    acc[skill.title] = (acc[skill.title] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get unique skills with their counts and proper categorization
  const uniqueSkills = Array.from(new Set(allEmployeeSkills.map(skill => skill.title))).map(skillTitle => {
    console.log('Getting data for employee skill:', skillTitle);
    const skillData = getUnifiedSkillData(skillTitle);
    const category = categorizeSkill(skillTitle, roleId || "123");
    return {
      ...skillData,
      count: skillCounts[skillTitle] || 1,
      category // Add the category to the skill data
    };
  });

  console.log('Displaying employee skills with categories:', uniqueSkills);

  return (
    <Card className="p-6 bg-white mt-6">
      <h2 className="text-2xl font-bold mb-6">Employee Skills</h2>
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
              {uniqueSkills.map((skill) => (
                <TableRow key={skill.id} className="hover:bg-muted/5">
                  <TableCell className="font-medium">{skill.title}</TableCell>
                  <TableCell>{skill.category}</TableCell>
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
                    <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-sm ${
                      skill.count > 1 ? 'bg-primary-accent/10 text-primary-accent' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {skill.count}
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