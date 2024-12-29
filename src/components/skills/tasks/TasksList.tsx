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
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-foreground">Tasks</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center text-xs text-gray-500">?</div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tasks associated with this role</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button className="bg-[#1A1F2C] text-white hover:bg-[#2A2F3C] flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Task
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{task.title}</p>
            </div>
            <div className="flex items-center gap-4">
              {task.aiPotential && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Zap className="h-4 w-4 text-[#F97316]" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>AI Potential</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <div className="flex items-center gap-1">
                <PieChart className="h-4 w-4 text-[#8073ec]" />
                <span className="text-sm text-[#8073ec]">{task.percentage}%</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                <Pencil className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};