import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

interface CompanySkill {
  title: string;
  subcategory: string;
  category: string;
  type: string;
  weight: string;
  growth: string;
  salary: string;
}

const companySkills: CompanySkill[] = [
  {
    title: "Deep Learning",
    subcategory: "AI & ML",
    category: "Software Developer",
    type: "Specialized",
    weight: "Critical",
    growth: "32%",
    salary: "$180,000"
  },
  {
    title: "Natural Language Processing",
    subcategory: "AI Applications",
    category: "Software Developer",
    type: "Specialized",
    weight: "Critical",
    growth: "30%",
    salary: "$175,000"
  },
  // ... Add all other skills from the image
];

export const CompanySkillsTable = () => {
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
            {companySkills.map((skill, index) => (
              <TableRow key={skill.title} className={index % 2 === 0 ? "bg-muted/5" : ""}>
                <TableCell className="font-medium">{skill.title}</TableCell>
                <TableCell>{skill.subcategory}</TableCell>
                <TableCell>{skill.category}</TableCell>
                <TableCell>{skill.type}</TableCell>
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
    </Card>
  );
};