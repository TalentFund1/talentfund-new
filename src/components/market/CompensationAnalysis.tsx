import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Users, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { CompensationStatsCard } from "./CompensationStatsCard";

export const CompensationAnalysis = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-6">
      {/* Job Overview Section */}
      <Card className="p-6 bg-[#F7F9FF]">
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
                <CompensationStatsCard
                  title="Matching Profiles"
                  value="8,745"
                  subtitle="Regional diversity: 58%"
                  icon={Users}
                />
                <CompensationStatsCard
                  title="Median Advertised Salary"
                  value="$140,456"
                  subtitle="749 salary observations"
                  icon={Building2}
                />
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

      {/* Stats Section */}
      <Card className="p-6 bg-[#F7F9FF]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Employers Competing"
            value="114"
            description="47,116 Total Employers"
            icon={<Building2 className="h-5 w-5" />}
          />
          <StatCard
            title="Unique Postings"
            value="1,749"
            description="8,116 Total Postings"
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard
            title="Posting Intensity"
            value="6:1"
            description="Regional Average 6:1"
            icon={<Clock className="h-5 w-5" />}
          />
          <StatCard
            title="Medial Posting Duration"
            value="27 Days"
            description="Regional Average: 29"
            icon={<Calendar className="h-5 w-5" />}
          />
        </div>
      </Card>

      {/* Compensation Analysis Section */}
      <Card className="p-6 bg-[#F7F9FF]">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Compensation Analysis</h3>
          
          <div className="space-y-4">
            <p className="text-secondary-foreground">
              <span className="font-medium">Compensation Range: $130,456 - $170,439:</span> There are 749 advertised salary observations (10% of the 6,749 matching postings).
            </p>
            
            <p className="text-secondary-foreground">
              Typical compensation in New York, NYC ranges from $130,456 - $170,439. The median wage is $150,447, which is about the same as the national median. When you adjust the median wage for location cost of living (which is 2.4% below the average) workers "feel like" they make $154,147.
            </p>
          </div>

          <div className="mt-6 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role Name</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Salary Range</TableHead>
                  <TableHead>10th</TableHead>
                  <TableHead>25th</TableHead>
                  <TableHead>50th</TableHead>
                  <TableHead>75th</TableHead>
                  <TableHead>90th</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Artificial Engineer</TableCell>
                  <TableCell>P3</TableCell>
                  <TableCell>USD</TableCell>
                  <TableCell>$110,000-115,000</TableCell>
                  <TableCell>$110,500</TableCell>
                  <TableCell>$111,250</TableCell>
                  <TableCell>$112,500</TableCell>
                  <TableCell>$113,750</TableCell>
                  <TableCell>$114,500</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Artificial Engineer</TableCell>
                  <TableCell>P4</TableCell>
                  <TableCell>USD</TableCell>
                  <TableCell>$120,000-125,000</TableCell>
                  <TableCell>$120,500</TableCell>
                  <TableCell>$121,500</TableCell>
                  <TableCell>$122,500</TableCell>
                  <TableCell>$123,750</TableCell>
                  <TableCell>$124,500</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Artificial Engineer</TableCell>
                  <TableCell>P5</TableCell>
                  <TableCell>USD</TableCell>
                  <TableCell>$130,000-145,000</TableCell>
                  <TableCell>$131,500</TableCell>
                  <TableCell>$133,750</TableCell>
                  <TableCell>$137,500</TableCell>
                  <TableCell>$141,250</TableCell>
                  <TableCell>$143,500</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="flex justify-end mt-4">
              <p className="text-sm text-secondary-foreground">Powered by Lightcast</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
