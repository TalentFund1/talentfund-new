import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";
import { SearchFilter } from '@/components/market/SearchFilter';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TalentMarketplace = () => {
  const [selectedJobTitle, setSelectedJobTitle] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // Sample data - in a real app this would come from an API
  const projects = [
    { title: "RnD", function: "Engineering", source: "Riipen", skillCount: 16, benchmark: 89 },
    { title: "UX/UI Project", function: "Engineering", source: "Riipen", skillCount: 12, benchmark: 100 },
    { title: "AI Implementation", function: "Data Science", source: "Riipen", skillCount: 20, benchmark: 95 },
    { title: "Mobile App Development", function: "Engineering", source: "Riipen", skillCount: 15, benchmark: 92 },
    { title: "Cloud Migration", function: "Infrastructure", source: "Riipen", skillCount: 18, benchmark: 87 },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">Talent Marketplace</h1>
          </div>

          <Card className="p-6">
            <div className="space-y-4">
              <SearchFilter
                label="Job Title"
                placeholder="Search job titles..."
                items={["Artificial Engineer", "Software Engineer", "Product Manager"]}
                selectedItems={selectedJobTitle}
                onItemsChange={setSelectedJobTitle}
                singleSelect={true}
              />
              
              <SearchFilter
                label="Skills"
                placeholder="Search skills..."
                items={["NLP", "Python", "Machine Learning", "Data Science"]}
                selectedItems={selectedSkills}
                onItemsChange={setSelectedSkills}
              />

              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedJobTitle([]);
                    setSelectedSkills([]);
                  }}
                >
                  Clear All
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-border">
                  <TableHead className="w-[25%] py-3 font-medium">Project Title ({projects.length})</TableHead>
                  <TableHead className="w-[20%] py-3 font-medium">Function</TableHead>
                  <TableHead className="w-[12%] py-3 font-medium">Source</TableHead>
                  <TableHead className="w-[10%] text-center py-3 font-medium">Skill Count</TableHead>
                  <TableHead className="w-[20%] text-center py-3 font-medium">Skill Benchmark</TableHead>
                  <TableHead className="w-[13%] text-right py-3 font-medium">See Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project, index) => (
                  <TableRow key={index} className="hover:bg-muted/50">
                    <TableCell className="py-3">{project.title}</TableCell>
                    <TableCell className="py-3">{project.function}</TableCell>
                    <TableCell className="py-3">{project.source}</TableCell>
                    <TableCell className="text-center py-3">{project.skillCount}</TableCell>
                    <TableCell className="text-center py-3">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-2xl text-sm">{project.benchmark}%</span>
                    </TableCell>
                    <TableCell className="text-right py-3">
                      <Button variant="link" className="text-blue-500 hover:text-blue-700 px-0">
                        Click here
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
              <Select defaultValue="10">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="10 rows" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 rows</SelectItem>
                  <SelectItem value="20">20 rows</SelectItem>
                  <SelectItem value="50">50 rows</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">1-5 of 5</span>
                <Button variant="outline" size="icon" className="w-8 h-8">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="w-8 h-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TalentMarketplace;