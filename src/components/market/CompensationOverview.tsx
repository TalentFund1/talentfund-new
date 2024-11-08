import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CompensationOverviewProps {
  title: string;
  location: string;
  function: string;
  occupation: string;
  matchingProfiles: number;
  regionalDiversity: string;
  medianSalary: string;
  salaryObservations: number;
  jobDescription: string;
}

export const CompensationOverview = ({
  title,
  location,
  function: jobFunction,
  occupation,
  matchingProfiles,
  regionalDiversity,
  medianSalary,
  salaryObservations,
  jobDescription
}: CompensationOverviewProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <span className="text-xl">|</span>
          <h3 className="text-xl">{location}</h3>
        </div>
        <Button>Add Skill Profile</Button>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <div className="space-y-4">
            <div>
              <span className="text-sm text-muted-foreground">Function</span>
              <p className="font-medium">{jobFunction}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Occupation</span>
              <p className="font-medium">{occupation}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{matchingProfiles}</span>
            </div>
            <p className="text-sm text-muted-foreground">Matching Profiles</p>
            <p className="text-sm">Regional diversity: {regionalDiversity}</p>
          </Card>
          <Card className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{medianSalary}</span>
            </div>
            <p className="text-sm text-muted-foreground">Median Advertised Salary</p>
            <p className="text-sm">{salaryObservations} salary observations</p>
          </Card>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Job Description</h3>
        <p className="text-sm text-muted-foreground">{jobDescription}</p>
        <Button variant="link" className="text-primary-accent p-0">See more</Button>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="font-semibold">Job Postings vs. Hires</h3>
        <p className="text-sm text-muted-foreground">
          In an average month, there are 1,749 unique job postings for Artificial Engineer from May 2023 to May 2024, of which 6,345 were unique. These numbers give us a Posting Intensity of 6-to-1, meaning that for every 6 postings, there is 1 unique job posting.
        </p>
        <p className="text-sm text-muted-foreground">
          This is close to the Posting Intensity for all other occupations and companies in the location (6-to-1), indicating that they are making an average effort toward hiring for this position.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-8 py-4">
        <div className="text-center">
          <p className="text-2xl font-bold">114</p>
          <p className="text-sm text-muted-foreground">Employers Competing</p>
          <p className="text-xs text-muted-foreground">47,116 Total Employers</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">1,749</p>
          <p className="text-sm text-muted-foreground">Unique Postings</p>
          <p className="text-xs text-muted-foreground">8,116 Total Postings</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">6: 1</p>
          <p className="text-sm text-muted-foreground">Posting Intensity</p>
          <p className="text-xs text-muted-foreground">Regional Average 6 : 1</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">27 Days</p>
          <p className="text-sm text-muted-foreground">Medial Posting Duration</p>
          <p className="text-xs text-muted-foreground">Regional Average: 29</p>
        </div>
      </div>
    </div>
  );
};