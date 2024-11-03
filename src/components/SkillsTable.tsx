import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const skills = [
  {
    title: "Amazon Web Services",
    subcategory: "Web Services",
    level: "advanced",
    growth: "12%"
  },
  {
    title: "Artificial Intelligence",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "advanced",
    growth: "19%"
  },
  {
    title: "Conversational AI",
    subcategory: "Natural Language Processing (NLP)",
    level: "advanced",
    growth: "12%"
  },
  {
    title: "Deep Learning",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "intermediate",
    growth: "19%"
  },
  {
    title: "Machine Learning",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "intermediate",
    growth: "10%"
  },
  {
    title: "Docker (Software)",
    subcategory: "Software Development Tools",
    level: "intermediate",
    growth: "0%"
  },
  {
    title: "MLflow",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "beginner",
    growth: "11%"
  }
];

export const SkillsTable = () => {
  return (
    <div className="bg-white rounded-lg border">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-foreground">Skills Matrix</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Skill Title</TableHead>
            <TableHead>Subcategory</TableHead>
            <TableHead>Beginner</TableHead>
            <TableHead>Intermediate</TableHead>
            <TableHead>Advanced</TableHead>
            <TableHead>Projected Growth</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skills.map((skill) => (
            <TableRow key={skill.title}>
              <TableCell>{skill.title}</TableCell>
              <TableCell>{skill.subcategory}</TableCell>
              <TableCell>
                {skill.level === "beginner" && (
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "#008000" }} />
                )}
              </TableCell>
              <TableCell>
                {skill.level === "intermediate" && (
                  <div className="h-2 w-2 rounded-full bg-primary-icon" />
                )}
              </TableCell>
              <TableCell>
                {skill.level === "advanced" && (
                  <div className="h-2 w-2 rounded-full bg-primary-accent" />
                )}
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  skill.growth === "0%" ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
                }`}>
                  ↗ {skill.growth}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="flex justify-between items-center p-4 border-t">
        <Select defaultValue="10">
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Rows" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 rows</SelectItem>
            <SelectItem value="20">20 rows</SelectItem>
            <SelectItem value="50">50 rows</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">1-4 of 4</span>
          <div className="flex gap-1">
            <Button variant="outline" size="icon" className="w-8 h-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="w-8 h-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};