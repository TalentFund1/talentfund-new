import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export const SkillProfileMatrix = () => {
  const skills = [
    { title: "Amazon Web Services", subcategory: "Web Services", growth: "23%", salary: "$160,256" },
    { title: "Software Development", subcategory: "Artificial Intelligence and Machine Learning", growth: "23%", salary: "$164,608" },
    { title: "Python", subcategory: "Natural Language Processing (NLP)", growth: "24%", salary: "$153,344" },
    { title: "Computer Science", subcategory: "Artificial Intelligence and Machine Learning", growth: "26%", salary: "$161,536" },
  ];

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Set Custom Benchmark</h2>
          <div className="space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Location</label>
            <Input className="mt-1" placeholder="Enter location..." />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Companies</label>
              <Button variant="link" className="text-sm p-0 h-auto">Clear</Button>
            </div>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">Netflix ×</Badge>
              <Badge variant="secondary">Disney ×</Badge>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Add Skills in Skill Profile</h3>
            <Button variant="outline">Clear All</Button>
          </div>

          <div className="flex gap-4">
            <div className="space-x-2">
              <Checkbox id="distinguishing" />
              <label htmlFor="distinguishing" className="text-sm">Distinguishing</label>
            </div>
            <div className="space-x-2">
              <Checkbox id="defining" />
              <label htmlFor="defining" className="text-sm">Defining</label>
            </div>
            <div className="space-x-2">
              <Checkbox id="necessary" />
              <label htmlFor="necessary" className="text-sm">Necessary</label>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2 font-medium">Skill Title</th>
                <th className="pb-2 font-medium">Subcategory</th>
                <th className="pb-2 font-medium text-center">Projected Growth</th>
                <th className="pb-2 font-medium text-right">Salary With Skill</th>
                <th className="pb-2 font-medium text-center">Benchmark</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.title} className="border-b last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <Checkbox />
                      <span>{skill.title}</span>
                    </div>
                  </td>
                  <td className="py-3">{skill.subcategory}</td>
                  <td className="py-3 text-center">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                      ↗ {skill.growth}
                    </span>
                  </td>
                  <td className="py-3 text-right">{skill.salary}</td>
                  <td className="py-3 text-center">
                    <div className="flex justify-center gap-1">
                      <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-sm">P</span>
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm">B</span>
                      <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center text-sm">C</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};