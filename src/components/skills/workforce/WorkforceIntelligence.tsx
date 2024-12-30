import { Card } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const WorkforceIntelligence = () => {
  console.log('Rendering WorkforceIntelligence component');
  
  return (
    <Card className="p-6 space-y-6 bg-white border border-border">
      <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
        Workforce Intelligence
      </h2>
      
      <div className="space-y-6">
        <div className="bg-[#F7F9FF] p-4 rounded-lg border border-[#CCDBFF]">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary-accent/10 p-2 rounded-lg">
              <Zap className="h-5 w-5 text-primary-accent" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">AI Potential</h3>
              <p className="text-sm text-muted-foreground">65% of 100%</p>
            </div>
          </div>
          <Progress value={65} className="h-2 bg-primary-accent/20" indicatorClassName="bg-primary-accent" />
        </div>
      </div>
    </Card>
  );
};