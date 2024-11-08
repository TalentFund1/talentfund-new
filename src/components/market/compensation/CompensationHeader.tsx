import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Building2, Users } from "lucide-react";
import { useState } from "react";

export const CompensationHeader = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold text-primary">Supply and Demand Analysis</h3>
              <Button 
                variant="default"
                className="bg-[#1F2144] text-white hover:bg-[#1F2144]/90"
              >
                Add Skill Profile
              </Button>
            </div>

            <Separator className="mb-6" />

            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-primary">Artificial Engineer</h2>
                  <span className="text-secondary-foreground text-sm">SOC: (11-9041)</span>
                </div>
                <p className="text-secondary-foreground mt-1">New York, NYC</p>
              </div>
            </div>

            <div className="flex mt-6">
              <div className="flex-1 flex items-center">
                <div className="grid grid-cols-2 gap-x-8 w-full max-w-md">
                  <div>
                    <p className="text-secondary-foreground">Function</p>
                    <p className="font-medium text-primary mt-1">Technology</p>
                  </div>
                  <div>
                    <p className="text-secondary-foreground">Occupation</p>
                    <p className="font-medium text-primary mt-1">Software Developer</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-end space-x-4">
                <Card className="p-4 w-64">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-secondary-foreground">Matching Profiles</p>
                      <h3 className="text-2xl font-bold text-primary mt-2">8,745</h3>
                      <p className="text-sm text-secondary-foreground mt-1">Regional diversity: 58%</p>
                    </div>
                    <Users className="h-5 w-5 text-primary-accent" />
                  </div>
                </Card>
                <Card className="p-4 w-64">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-secondary-foreground">Median Advertised Salary</p>
                      <h3 className="text-2xl font-bold text-primary mt-2">$140,456</h3>
                      <p className="text-sm text-secondary-foreground mt-1">749 salary observations</p>
                    </div>
                    <Building2 className="h-5 w-5 text-primary-accent" />
                  </div>
                </Card>
              </div>
            </div>

            <Separator className="my-4" />

            <div>
              <h3 className="text-lg font-semibold mb-2">Job Description</h3>
              <div className="relative">
                <p className={`text-secondary-foreground ${!isExpanded ? 'line-clamp-2' : ''}`}>
                  AI engineer engineer will join a multidisciplinary team helping to shape our AI strategy and showcasing the potential for AI through early-stage solutions. This is an excellent opportunity to take advantage of emerging trends and technologies and make a real-world difference.
                </p>
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-primary-accent hover:text-primary-accent/80 transition-colors ml-1"
                >
                  {isExpanded ? 'See less' : 'See more'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
