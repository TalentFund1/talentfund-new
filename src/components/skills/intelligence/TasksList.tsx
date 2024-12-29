import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

export const TasksList = () => {
  const tasks = [
    "Design and implement machine learning models",
    "Develop and optimize AI algorithms",
    "Collaborate with cross-functional teams",
    "Conduct data analysis and preprocessing",
    "Deploy and monitor ML systems"
  ];

  return (
    <Card className="p-6 bg-white">
      <h2 className="text-lg font-semibold mb-4">Key Tasks & Responsibilities</h2>
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="p-1 rounded-full bg-green-100">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-sm text-muted-foreground">{task}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};