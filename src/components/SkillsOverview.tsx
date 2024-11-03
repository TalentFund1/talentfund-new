import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  {
    category: "Software Development",
    subcategory: "Programming Languages",
    skill: "Python",
    proficiency: 85,
    color: "#FFD699"
  },
  {
    category: "Software Development",
    subcategory: "Web Development",
    skill: "React",
    proficiency: 78,
    color: "#FFD699"
  },
  {
    category: "AI & Machine Learning",
    subcategory: "Deep Learning",
    skill: "Neural Networks",
    proficiency: 92,
    color: "#FF9999"
  },
  {
    category: "AI & Machine Learning",
    subcategory: "NLP",
    skill: "Text Processing",
    proficiency: 75,
    color: "#FF9999"
  },
  {
    category: "Design & UX",
    subcategory: "UI Design",
    skill: "Figma",
    proficiency: 88,
    color: "#99D6B9"
  },
  {
    category: "Design & UX",
    subcategory: "User Research",
    skill: "Usability Testing",
    proficiency: 82,
    color: "#99D6B9"
  }
];

export const SkillsOverview = () => {
  return (
    <Card className="p-6 animate-fade-in border-border border">
      <h2 className="text-xl font-semibold text-foreground mb-2">Skills Distribution</h2>
      <p className="text-sm text-secondary-foreground mb-6">
        Here you can find an overview of skills in your organization, categorized into three levels. Check the Employee tab to explore further.
      </p>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-sm font-medium">Category</div>
        <div className="text-sm font-medium">Subcategory</div>
        <div className="text-sm font-medium">Skill Title</div>
      </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
            <XAxis dataKey="skill" />
            <YAxis />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border border-border rounded shadow-sm">
                      <p className="font-medium">{data.skill}</p>
                      <p className="text-sm text-secondary-foreground">{data.category}</p>
                      <p className="text-sm text-secondary-foreground">{data.subcategory}</p>
                      <p className="text-sm font-medium">Proficiency: {data.proficiency}%</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="proficiency"
              fill="#8073ec"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};