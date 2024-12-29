import { Card } from "@/components/ui/card";
import { Zap } from "lucide-react";

export const WorkforceIntelligence = () => {
  return (
    <Card className="p-6 bg-white space-y-4">
      <h2 className="text-2xl font-semibold text-[#1F2144]">Workforce Intelligence</h2>
      
      <div className="bg-[#F8F9FC] rounded-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-[#F3F4FF] flex items-center justify-center">
            <Zap className="w-6 h-6 text-[#9b87f5]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#1F2144]">AI Potential</h3>
            <p className="text-sm text-gray-600">65% of 100%</p>
          </div>
        </div>
        
        <div className="relative h-2 bg-[#F3F4FF] rounded-full mt-4">
          <div 
            className="absolute left-0 top-0 h-full bg-[#9b87f5] rounded-full"
            style={{ width: '65%' }}
          />
        </div>
      </div>
    </Card>
  );
};