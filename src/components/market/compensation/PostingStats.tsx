import { StatCard } from "@/components/StatCard";
import { Building2, Users, Clock, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

export const PostingStats = () => {
  return (
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
  );
};