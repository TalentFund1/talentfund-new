import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { JobStats } from "./JobStats";
import { PostingStats } from "./PostingStats";

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
              <JobStats />
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

            <Separator className="my-6" />

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Job Postings vs. Hires</h3>
                <p className="text-secondary-foreground mb-4">
                  In an average month, there are 1,749 unique job postings for Artificial Engineer from May 2023 to May 2024, of which 6,345 were unique. These numbers give us a Posting Intensity of 6-to-1, meaning that for every 6 postings, there is 1 unique job posting.
                </p>
                <p className="text-secondary-foreground mb-6">
                  This is close to the Posting Intensity for all other occupations and companies in the location (6-to-1), indicating that they are making an average effort toward hiring for this position.
                </p>
              </div>

              <PostingStats />
            </div>

            <Separator className="my-6" />

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Compensation Analysis</h3>
                <p className="text-secondary-foreground mb-4">
                  Compensation Range: $130,456 - $170,439: There are 749 advertised salary observations (10% of the 6,749 matching postings).
                </p>
                <p className="text-secondary-foreground mb-6">
                  Typical compensation in New York, NYC ranges from $130,456 - $170,439. The median wage is $150,447, which is about the same as the national median. When you adjust the median wage for location cost of living (which is 2.4% below the average) workers "feel like" they make $154,147.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4">Role Name</th>
                      <th className="text-left py-3 px-4">Level</th>
                      <th className="text-left py-3 px-4">Currency</th>
                      <th className="text-left py-3 px-4">Salary Range</th>
                      <th className="text-left py-3 px-4">10th</th>
                      <th className="text-left py-3 px-4">25th</th>
                      <th className="text-left py-3 px-4">50th</th>
                      <th className="text-left py-3 px-4">75th</th>
                      <th className="text-left py-3 px-4">90th</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4">Artificial Engineer</td>
                      <td className="py-3 px-4">P3</td>
                      <td className="py-3 px-4">USD</td>
                      <td className="py-3 px-4">$110,000-115,000</td>
                      <td className="py-3 px-4">$110,500</td>
                      <td className="py-3 px-4">$111,250</td>
                      <td className="py-3 px-4">$112,500</td>
                      <td className="py-3 px-4">$113,750</td>
                      <td className="py-3 px-4">$114,500</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4">Artificial Engineer</td>
                      <td className="py-3 px-4">P4</td>
                      <td className="py-3 px-4">USD</td>
                      <td className="py-3 px-4">$120,000-125,000</td>
                      <td className="py-3 px-4">$120,500</td>
                      <td className="py-3 px-4">$121,500</td>
                      <td className="py-3 px-4">$122,500</td>
                      <td className="py-3 px-4">$123,750</td>
                      <td className="py-3 px-4">$124,500</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Artificial Engineer</td>
                      <td className="py-3 px-4">P5</td>
                      <td className="py-3 px-4">USD</td>
                      <td className="py-3 px-4">$130,000-145,000</td>
                      <td className="py-3 px-4">$131,500</td>
                      <td className="py-3 px-4">$133,750</td>
                      <td className="py-3 px-4">$137,500</td>
                      <td className="py-3 px-4">$141,250</td>
                      <td className="py-3 px-4">$143,500</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};