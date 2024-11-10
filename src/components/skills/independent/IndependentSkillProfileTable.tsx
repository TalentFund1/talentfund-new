import { Switch } from "@/components/ui/switch";
import { ArrowUp, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

const mockSkills = [
  {
    title: "Amazon Web Services",
    subcategory: "Web Services",
    growth: "23%",
    salary: "$180,256",
    benchmarks: { J: true, B: true, O: true }
  },
  {
    title: "Software Development",
    subcategory: "Artificial Intelligence and Machine Learning",
    growth: "23%",
    salary: "$184,608",
    benchmarks: { J: true, B: true, O: true }
  },
  {
    title: "Python",
    subcategory: "Natural Language Processing (NLP)",
    growth: "24%",
    salary: "$173,344",
    benchmarks: { J: true, B: true, O: true }
  },
  {
    title: "Computer Science",
    subcategory: "Artificial Intelligence and Machine Learning",
    growth: "26%",
    salary: "$181,536",
    benchmarks: { J: true, B: true, O: true }
  },
  {
    title: "Scalability",
    subcategory: "Artificial Intelligence and Machine Learning",
    growth: "25%",
    salary: "$195,616",
    benchmarks: { J: true, B: true, O: true }
  },
  {
    title: "Software Engineering",
    subcategory: "Software Development Tools",
    growth: "23%",
    salary: "$180,512",
    benchmarks: { J: true, B: true, O: true }
  },
  {
    title: "Kubernetes",
    subcategory: "Artificial Intelligence and Machine Learning",
    growth: "21%",
    salary: "$178,208",
    benchmarks: { J: true, B: true, O: true }
  }
];

export const IndependentSkillProfileTable = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSkill = (skillTitle: string) => {
    setSelectedSkills(prev => 
      prev.includes(skillTitle) 
        ? prev.filter(title => title !== skillTitle)
        : [...prev, skillTitle]
    );
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-background text-left">
          <th className="py-4 px-4 text-sm font-medium text-muted-foreground w-[25%]">Skill Title</th>
          <th className="py-4 px-4 text-sm font-medium text-muted-foreground w-[30%]">Subcategory</th>
          <th className="py-4 px-4 text-sm font-medium text-muted-foreground text-center w-[15%]">
            <div className="flex items-center justify-center gap-1">
              Projected Growth
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent side="top" align="start" className="max-w-[300px] p-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-left">Projected Growth:</h4>
                      <p className="text-sm text-left font-normal">
                        Indicates the projected growth rate for this skill over the next year based on market demand and industry trends.
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </th>
          <th className="py-4 px-4 text-sm font-medium text-muted-foreground text-center w-[15%]">
            <div className="flex items-center justify-center gap-1">
              Salary With Skill
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent side="top" align="start" className="max-w-[300px] p-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-left">Salary with Skill:</h4>
                      <p className="text-sm text-left font-normal">
                        Reflects the Nationwide Median Advertised Salary for the past year based on the selected Job Title and the Skill.
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </th>
          <th className="py-4 px-4 text-sm font-medium text-muted-foreground text-center w-[15%]">
            <div className="flex items-center justify-center gap-1">
              Appears In
              <ArrowUp className="h-4 w-4" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {mockSkills.map((skill) => (
          <tr 
            key={skill.title}
            className="border-t border-border hover:bg-muted/50 transition-colors"
          >
            <td className="py-3 px-4">
              <div className="flex items-center gap-2">
                <Switch 
                  checked={selectedSkills.includes(skill.title)}
                  onCheckedChange={() => toggleSkill(skill.title)}
                />
                <span className="text-sm">{skill.title}</span>
              </div>
            </td>
            <td className="py-3 px-4 text-sm">
              <span className="block truncate" title={skill.subcategory}>
                {skill.subcategory}
              </span>
            </td>
            <td className="py-3 px-4 text-center">
              <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-sm">
                ↗ {skill.growth}
              </span>
            </td>
            <td className="py-3 px-4 text-center text-sm">{skill.salary}</td>
            <td className="py-3 px-4">
              <div className="flex justify-center gap-1">
                <span className="w-6 h-6 rounded-full bg-[#8073ec]/20 text-primary flex items-center justify-center text-sm font-medium">J</span>
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-medium">B</span>
                <span className="w-6 h-6 rounded-full bg-primary-icon/10 text-primary-icon flex items-center justify-center text-sm font-medium">O</span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};