import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Zap, PieChart, Pencil } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Task {
  id: string;
  title: string;
  aiPotential: boolean;
  percentage: number;
}

const tasks: Task[] = [
  { id: "1", title: "Conducting detailed financial analysis for decision-making", aiPotential: true, percentage: 5 },
  { id: "2", title: "Leading financial forecasting initiatives for the company", aiPotential: true, percentage: 8 },
  { id: "3", title: "Creating complex financial models to predict outcomes", aiPotential: false, percentage: 4 },
  { id: "4", title: "Developing comprehensive corporate budgeting reports", aiPotential: false, percentage: 3 },
  { id: "5", title: "Evaluating the company's financial performance trends", aiPotential: true, percentage: 6 }
];

export const TasksList = () => {
  console.log('Rendering TasksList component');

  return (
    <Card className="p-6 space-y-6 bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          Tasks
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="cursor-help">
                <div className="bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center text-xs text-gray-500">?</div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tasks associated with this role</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h2>
        <Button className="bg-[#1A1F2C] text-white hover:bg-[#2A2F3C]">
          <Plus className="h-4 w-4 mr-2" /> Add Task
        </Button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
            <div className="flex-1">
              <p className="text-sm text-foreground">{task.title}</p>
            </div>
            <div className="flex items-center gap-4">
              {task.aiPotential && (
                <Zap className="h-4 w-4 text-primary" />
              )}
              <div className="flex items-center gap-1">
                <PieChart className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{task.percentage}%</span>
              </div>
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};