import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, TrendingUp, Users, MapPin } from "lucide-react";

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
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <h3 className="text-lg">{location}</h3>
          </div>
        </div>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Skill Profile
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-sm text-muted-foreground">Function</span>
              <p className="text-lg font-medium text-foreground mt-1">{jobFunction}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Occupation</span>
              <p className="text-lg font-medium text-foreground mt-1">{occupation}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-6 space-y-3 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary-icon" />
              <span className="text-2xl font-bold text-foreground">{matchingProfiles}</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">Matching Profiles</p>
              <p className="text-sm text-muted-foreground">Regional diversity: {regionalDiversity}</p>
            </div>
          </Card>
          <Card className="p-6 space-y-3 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-primary-icon" />
              <span className="text-2xl font-bold text-foreground">{medianSalary}</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">Median Advertised Salary</p>
              <p className="text-sm text-muted-foreground">{salaryObservations} salary observations</p>
            </div>
          </Card>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Job Description</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{jobDescription}</p>
        <Button variant="link" className="text-primary-accent p-0 h-auto font-medium">See more</Button>
      </div>

      <Separator className="my-8" />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Job Postings vs. Hires</h3>
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-muted-foreground">
            In an average month, there are 1,749 unique job postings for Artificial Engineer from May 2023 to May 2024, of which 6,345 were unique. These numbers give us a Posting Intensity of 6-to-1, meaning that for every 6 postings, there is 1 unique job posting.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            This is close to the Posting Intensity for all other occupations and companies in the location (6-to-1), indicating that they are making an average effort toward hiring for this position.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8 py-6">
        <div className="text-center space-y-2">
          <p className="text-2xl font-bold text-foreground">114</p>
          <p className="text-sm font-medium text-foreground">Employers Competing</p>
          <p className="text-xs text-muted-foreground">47,116 Total Employers</p>
        </div>
        <div className="text-center space-y-2">
          <p className="text-2xl font-bold text-foreground">1,749</p>
          <p className="text-sm font-medium text-foreground">Unique Postings</p>
          <p className="text-xs text-muted-foreground">8,116 Total Postings</p>
        </div>
        <div className="text-center space-y-2">
          <p className="text-2xl font-bold text-foreground">6: 1</p>
          <p className="text-sm font-medium text-foreground">Posting Intensity</p>
          <p className="text-xs text-muted-foreground">Regional Average 6 : 1</p>
        </div>
        <div className="text-center space-y-2">
          <p className="text-2xl font-bold text-foreground">27 Days</p>
          <p className="text-sm font-medium text-foreground">Medial Posting Duration</p>
          <p className="text-xs text-muted-foreground">Regional Average: 29</p>
        </div>
      </div>
    </div>
  );
};