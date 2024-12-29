import { Card } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const WorkforceIntelligence = () => {
  console.log('Rendering WorkforceIntelligence component');
  
  return (
    <Card className="p-6 space-y-6 bg-white">
      <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
        Workforce Intelligence
      </h2>
      
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">AI Potential</h3>
              <p className="text-sm text-muted-foreground">65% of 100%</p>
            </div>
          </div>
          <Progress value={65} className="h-2 bg-primary/20" />
        </div>
      </div>
    </Card>
  );
};