import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { getUnifiedSkillData } from "./data/centralSkillsDatabase";

export const CompanySkillsTable = () => {
  const { toggledSkills } = useToggledSkills();
  
  // Convert Set to Array and map to get full skill data
  const skills = Array.from(toggledSkills).map(skillTitle => {
    console.log('Getting data for toggled skill:', skillTitle);
    const skillData = getUnifiedSkillData(skillTitle);
    
    // Ensure proper subcategory
    if (skillData.subcategory === "General Skills") {
      // Map general skills to more specific subcategories
      if (skillData.title.includes("AWS")) {
        skillData.subcategory = "Cloud Platforms";
      } else if (skillData.title.includes("Certified")) {
        skillData.subcategory = "Professional Certifications";
      }
    }
    
    // Ensure growth value
    if (skillData.growth === "0%") {
      // Set default growth rates for different categories
      if (skillData.subcategory === "Professional Certifications") {
        skillData.growth = "25%";
      } else if (skillData.subcategory === "Cloud Platforms") {
        skillData.growth = "30%";
      } else {
        skillData.growth = "15%";
      }
    }
    
    // Ensure skill pricer value
    if (skillData.salary === "$0") {
      // Set default salary ranges based on subcategory
      if (skillData.subcategory === "Professional Certifications") {
        skillData.salary = "$150,000";
      } else if (skillData.subcategory === "Cloud Platforms") {
        skillData.salary = "$160,000";
      } else {
        skillData.salary = "$140,000";
      }
    }
    
    return skillData;
  });

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
                <TableHead className="font-semibold text-right">Projected Growth</TableHead>
                <TableHead className="font-semibold text-right">Skill Pricer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skills.map((skill, index) => (
                <TableRow key={skill.title} className={index % 2 === 0 ? "bg-muted/5" : ""}>
                  <TableCell className="font-medium">{skill.title}</TableCell>
                  <TableCell>{skill.subcategory}</TableCell>
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