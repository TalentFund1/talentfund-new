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
    <Card className="p-4 space-y-3 bg-white">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-primary">Tasks</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="bg-gray-100 rounded-full w-4 h-4 flex items-center justify-center text-xs text-gray-600">?</div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tasks associated with this role</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button className="bg-primary text-white hover:bg-primary/90 flex items-center gap-1.5 py-1.5 h-8 text-sm rounded-md">
          <Plus className="h-3.5 w-3.5" /> Add Task
        </Button>
      </div>

      <div className="space-y-1.5">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className="flex items-center justify-between py-2 px-3 border border-border rounded-lg hover:bg-background/80 transition-colors"
          >
            <div className="flex-1">
              <p className="text-sm text-primary leading-tight">{task.title}</p>
            </div>
            <div className="flex items-center gap-2">
              {task.aiPotential && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="bg-primary-icon/10 p-1 rounded">
                        <Zap className="h-3 w-3 text-primary-icon" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>AI Potential</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <div className="flex items-center gap-1 bg-primary-accent/10 px-2 py-1 rounded">
                <PieChart className="h-3 w-3 text-primary-accent" />
                <span className="text-xs font-medium text-primary-accent">{task.percentage}%</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-background">
                <Pencil className="h-3 w-3 text-gray-600" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};