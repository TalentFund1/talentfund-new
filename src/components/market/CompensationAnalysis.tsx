import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Users, Clock, Calendar } from "lucide-react";

export const CompensationAnalysis = () => {
  return (
    <div className="space-y-6">
      {/* Job Overview Section */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-primary">Artificial Engineer</h2>
                <p className="text-secondary-foreground mt-1">New York, NYC</p>
              </div>
              <button className="px-4 py-2 bg-primary text-white font-medium rounded hover:bg-primary/90 transition-colors">
                Add Skill Profile
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-secondary-foreground">Function</p>
                <p className="font-medium text-primary mt-1">Technology</p>
              </div>
              <div>
                <p className="text-secondary-foreground">Occupation</p>
                <p className="font-medium text-primary mt-1">Software Developer</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <StatCard
                title="Matching Profiles"
                value="8,745"
                description="Regional diversity: 58%"
                icon={<Users className="h-5 w-5" />}
              />
              <StatCard
                title="Median Advertised Salary"
                value="$140,456"
                description="749 salary observations"
                icon={<Building2 className="h-5 w-5" />}
              />
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Job Description</h3>
              <p className="text-secondary-foreground">
                AI engineer engineer will join a multidisciplinary team helping to shape our AI strategy and showcasing the potential for AI through early-stage solutions. This is an excellent opportunity to take advantage of emerging trends and technologies and make a real-world difference.
                <button className="text-primary-accent ml-2 hover:underline">See more</button>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
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
        </div>
      </Card>

      {/* Compensation Analysis Section */}
      <Card className="p-6">
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