import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CompensationHeaderProps {
  title: string;
  location: string;
  function: string;
  occupation: string;
  socCode: string;
}

export const CompensationHeader = ({ 
  title, 
  location, 
  function: functionName, 
  occupation,
  socCode 
}: CompensationHeaderProps) => {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-primary">Compensation Analysis</h3>
          <Button 
            variant="default"
            className="bg-[#1F2144] text-white hover:bg-[#1F2144]/90"
          >
            Add Skill Profile
          </Button>
        </div>

        <Separator className="mb-4" />

        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-primary">{title}</h2>
              <span className="text-secondary-foreground text-sm">SOC: ({socCode})</span>
            </div>
            <p className="text-secondary-foreground mt-1">{location}</p>
          </div>
        </div>

        <div className="flex mt-6">
          <div className="flex-1 flex items-center">
            <div className="grid grid-cols-2 gap-x-8 w-full max-w-md">
              <div>
                <p className="text-secondary-foreground">Function</p>
                <p className="font-medium text-primary mt-1">{functionName}</p>
              </div>
              <div>
                <p className="text-secondary-foreground">Occupation</p>
                <p className="font-medium text-primary mt-1">{occupation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};