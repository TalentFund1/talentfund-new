import { StatCard } from "@/components/StatCard";
import { Building2, Users, Clock, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RankingSection } from "./RankingSection";

const topCompanies = [
  { name: "United Services Automobile Ass...", profiles: 418 },
  { name: "Capital One Financial Corporation", profiles: 357 },
  { name: "JPMorgan Chase & Co.", profiles: 312 },
  { name: "Lockheed Martin Corporation", profiles: 306 },
  { name: "Verizon Communications Inc.", profiles: 281 }
];

const topJobTitles = [
  { name: "Software Engineer", profiles: 2887 },
  { name: ".NET Software Engineer", profiles: 1845 },
  { name: "Software Developer", profiles: 1368 },
  { name: "Software Development Engineer", profiles: 313 },
  { name: "Application Developer", profiles: 280 }
];

export const JobPostingStats = () => {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-primary mb-4">Job Postings vs. Hires</h3>
          <p className="text-secondary-foreground mb-4">
            In an average month, there are <strong>1,749</strong> unique job postings for Artificial Engineer from May 2023 to May 2024, of which <strong>6,345</strong> were unique. These numbers give us a Posting Intensity of <strong>6-to-1</strong>, meaning that for every 6 postings, there is 1 unique job posting.
          </p>
          <p className="text-secondary-foreground mb-6">
            This is close to the Posting Intensity for all other occupations and companies in the location (6-to-1), indicating that they are making an average effort toward hiring for this position.
          </p>
          <Separator className="mb-6 bg-border" />
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          <Card className="p-6">
            <RankingSection 
              title="Top Companies" 
              items={topCompanies}
              maxProfiles={418}
            />
          </Card>
          <Card className="p-6">
            <RankingSection 
              title="Top Job Titles" 
              items={topJobTitles}
              maxProfiles={2887}
            />
          </Card>
        </div>
      </div>
    </Card>
  );
};