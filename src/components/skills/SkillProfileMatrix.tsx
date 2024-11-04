import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Building2, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const SkillProfileMatrix = () => {
  const skills = [
    { title: "Amazon Web Services", subcategory: "Web Services", growth: "23%", salary: "$160,256" },
    { title: "Software Development", subcategory: "Artificial Intelligence and Machine Learning", growth: "23%", salary: "$164,608" },
    { title: "Python", subcategory: "Natural Language Processing (NLP)", growth: "24%", salary: "$153,344" },
    { title: "Computer Science", subcategory: "Artificial Intelligence and Machine Learning", growth: "26%", salary: "$161,536" },
  ];

  return (
    <Card className="p-6 space-y-6 animate-fade-in">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-foreground">Set Custom Benchmark</h2>
          <div className="space-x-2">
            <Button variant="outline" className="bg-white">Cancel</Button>
            <Button>Save</Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              Location
            </label>
            <Input 
              className="bg-white" 
              placeholder="Enter location..." 
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                Companies
              </label>
              <Button variant="ghost" className="text-sm h-auto py-1 px-2 hover:bg-background">Clear</Button>
            </div>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                Netflix
                <X className="h-3 w-3 cursor-pointer hover:text-primary-accent" />
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                Disney
                <X className="h-3 w-3 cursor-pointer hover:text-primary-accent" />
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Add Skills in Skill Profile</h3>
            <Button variant="outline" className="bg-white">Clear All</Button>
          </div>

          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Checkbox id="distinguishing" />
              <label htmlFor="distinguishing" className="text-sm cursor-pointer">Distinguishing</label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="defining" />
              <label htmlFor="defining" className="text-sm cursor-pointer">Defining</label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="necessary" />
              <label htmlFor="necessary" className="text-sm cursor-pointer">Necessary</label>
            </div>
          </div>

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
                        <Checkbox />
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
        </div>
      </div>
    </Card>
  );
};