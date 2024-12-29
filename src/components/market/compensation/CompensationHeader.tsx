import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Building2, Download, Users } from "lucide-react";
import { useState } from "react";

export const CompensationHeader = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="p-8">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-primary">Market Analysis</h3>
            <div className="space-x-3">
              <Button 
                variant="outline"
                className="text-primary hover:text-primary/90"
              >
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <Button 
                variant="default"
                className="bg-[#1F2144] text-white hover:bg-[#1F2144]/90"
              >
                Add Skill Profile
              </Button>
            </div>
          </div>

          <Separator className="mb-8" />

          <div className="flex justify-between items-start">
            <div className="space-y-6">
              <div>
                <div className="flex items-end gap-3">
                  <h2 className="text-2xl font-bold text-primary">Artificial Engineer</h2>
                  <span className="text-secondary-foreground text-sm mb-1">SOC: (11-9041)</span>
                </div>
                <p className="text-secondary-foreground mt-4">New York, NYC</p>
              </div>

              <div className="grid grid-cols-2 gap-x-16 w-full max-w-md">
                <div>
                  <p className="text-secondary-foreground mb-1">Function</p>
                  <p className="font-medium text-primary">Technology</p>
                </div>
                <div>
                  <p className="text-secondary-foreground mb-1">Occupation</p>
                  <p className="font-medium text-primary">Software Developer</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Card className="p-6 w-64">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-secondary-foreground">Matching Profiles</p>
                    <h3 className="text-2xl font-bold text-primary mt-2">8,745</h3>
                    <p className="text-sm text-secondary-foreground mt-1">Regional diversity: 58%</p>
                  </div>
                  <Users className="h-5 w-5 text-primary-accent" />
                </div>
              </Card>
              <Card className="p-6 w-64">
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

          <div className="mt-8">
            <p className="text-secondary-foreground mb-1">Job Description</p>
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
  );
};