import { Card } from "@/components/ui/card";
import { Brain, TrendingUp, Users } from "lucide-react";

export const WorkforceIntelligence = () => {
  return (
    <Card className="p-6 bg-white">
      <h2 className="text-lg font-semibold mb-4">Workforce Intelligence</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-start gap-3 p-4 rounded-lg border border-border">
          <div className="p-2 rounded-lg bg-primary/10">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Skills Demand</h3>
            <p className="text-sm text-muted-foreground">High demand for AI/ML skills in the market</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-4 rounded-lg border border-border">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Growth Trend</h3>
            <p className="text-sm text-muted-foreground">15% YoY increase in AI Engineer roles</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg border border-border">
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Talent Pool</h3>
            <p className="text-sm text-muted-foreground">500+ qualified candidates available</p>
          </div>
        </div>
      </div>
    </Card>
  );
};