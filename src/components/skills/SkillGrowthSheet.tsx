import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { TrendingUp } from "lucide-react";

interface SkillGrowthSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill: {
    title: string;
    growth: string;
  };
}

export const SkillGrowthSheet = ({ open, onOpenChange, skill }: SkillGrowthSheetProps) => {
  const growthValue = parseInt(skill.growth);
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader className="space-y-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary-accent" />
            <SheetTitle>Skill Growth Details</SheetTitle>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{skill.title}</h3>
              <div className="mt-2 flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  skill.growth === "0%" ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
                }`}>
                  ↗ {skill.growth}
                </span>
                <span className="text-sm text-muted-foreground">
                  projected growth
                </span>
              </div>
            </div>

            <SheetDescription className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Growth Projection</h4>
                <p className="text-sm">
                  {growthValue > 15 
                    ? "High growth potential with significant demand increase expected."
                    : growthValue > 0
                    ? "Moderate growth expected with steady demand in the market."
                    : "Stable skill with consistent market demand."}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Market Insights</h4>
                <p className="text-sm">
                  Based on industry trends and market analysis, this skill shows 
                  {growthValue > 10 ? " strong" : growthValue > 0 ? " positive" : " stable"} 
                  growth indicators for the next 12 months.
                </p>
              </div>
            </SheetDescription>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};