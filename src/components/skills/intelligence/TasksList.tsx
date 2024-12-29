import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Zap } from "lucide-react";

interface Task {
  id: number;
  title: string;
  progress: number;
  isHighPriority: boolean;
}

const tasks: Task[] = [
  {
    id: 1,
    title: "Conducting detailed financial analysis for decision-making",
    progress: 5,
    isHighPriority: true
  },
  {
    id: 2,
    title: "Leading financial forecasting initiatives for the company",
    progress: 8,
    isHighPriority: true
  },
  {
    id: 3,
    title: "Creating complex financial models to predict outcomes",
    progress: 4,
    isHighPriority: false
  },
  {
    id: 4,
    title: "Developing comprehensive corporate budgeting reports",
    progress: 3,
    isHighPriority: false
  },
  {
    id: 5,
    title: "Evaluating the company's financial performance trends",
    progress: 6,
    isHighPriority: true
  }
];

export const TasksList = () => {
  return (
    <Card className="p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold text-[#1F2144]">Tasks</h2>
          <div className="w-5 h-5 rounded-full bg-[#F3F4FF] flex items-center justify-center">
            <span className="text-xs font-medium text-[#9b87f5]">{tasks.length}</span>
          </div>
        </div>
        <Button 
          variant="default"
          className="bg-[#1F2144] hover:bg-[#2a2d5d] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div 
            key={task.id}
            className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors bg-white flex items-center justify-between group"
          >
            <div className="flex-1">
              <p className="text-[#1F2144] font-medium">{task.title}</p>
            </div>
            
            <div className="flex items-center gap-3">
              {task.isHighPriority && (
                <Zap className="w-5 h-5 text-[#9b87f5]" />
              )}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#F3F4FF] flex items-center justify-center">
                  <span className="text-sm font-medium text-[#9b87f5]">{task.progress}%</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Pencil className="w-4 h-4 text-gray-500" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};