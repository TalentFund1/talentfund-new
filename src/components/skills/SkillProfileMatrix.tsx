import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export const SkillProfileMatrix = () => {
  const skills = [
    { title: "Amazon Web Services", subcategory: "Web Services", level: "advanced", growth: "23%", salary: "$160,256" },
    { title: "Software Development", subcategory: "Artificial Intelligence and Machine Learning", level: "advanced", growth: "23%", salary: "$164,608" },
    { title: "Python", subcategory: "Natural Language Processing (NLP)", level: "intermediate", growth: "24%", salary: "$153,344" },
    { title: "Computer Science", subcategory: "Artificial Intelligence and Machine Learning", level: "intermediate", growth: "26%", salary: "$161,536" }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6 animate-fade-in bg-white">
        <h3 className="text-lg font-semibold mb-4">1. Select Benchmark</h3>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">Custom Benchmark</h4>
            <Select defaultValue="nationwide">
              <SelectTrigger>
                <SelectValue placeholder="Select benchmark" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nationwide">Nationwide / All Companies (default)</SelectItem>
                <SelectItem value="core">Core Competitors</SelectItem>
                <SelectItem value="finance">Finance/Banking</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="retail">Large Retailers</SelectItem>
                <SelectItem value="tech">Technology</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Locations</h4>
              <Input placeholder="Add a Location" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Companies</h4>
              <Input placeholder="Add a Company" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Industries</h4>
              <Input placeholder="Add a Industry" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline">Save To Role</Button>
          <Button variant="outline">Clear All</Button>
        </div>
      </Card>

      <Card className="p-6 space-y-6 animate-fade-in bg-white">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-background text-left">
                <th className="py-3 px-4 font-medium">Skill Title</th>
                <th className="py-3 px-4 font-medium">Subcategory</th>
                <th className="py-3 px-4 font-medium text-center">Projected Growth</th>
                <th className="py-3 px-4 font-medium text-right">Salary With Skill</th>
                <th className="py-3 px-4 font-medium text-center">Benchmark</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.title} className="border-t border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Switch />
                      <span className="text-sm">{skill.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{skill.subcategory}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-sm">
                      ↗ {skill.growth}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-sm">{skill.salary}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-1">
                      <span className="w-6 h-6 rounded-full bg-[#8073ec]/20 text-primary flex items-center justify-center text-sm font-medium">P</span>
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-medium">B</span>
                      <span className="w-6 h-6 rounded-full bg-primary-icon/10 text-primary-icon flex items-center justify-center text-sm font-medium">C</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};