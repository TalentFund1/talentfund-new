import { Card } from "@/components/ui/card";
import { Building2, Users, Clock, Calendar } from "lucide-react";

export const PostingStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-secondary-foreground">Employers Competing</p>
            <h3 className="text-2xl font-bold text-primary mt-2">114</h3>
            <p className="text-sm text-secondary-foreground mt-1">47,116 Total Employers</p>
          </div>
          <Building2 className="h-5 w-5 text-primary-accent" />
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-secondary-foreground">Unique Postings</p>
            <h3 className="text-2xl font-bold text-primary mt-2">1,749</h3>
            <p className="text-sm text-secondary-foreground mt-1">8,116 Total Postings</p>
          </div>
          <Users className="h-5 w-5 text-primary-accent" />
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-secondary-foreground">Posting Intensity</p>
            <h3 className="text-2xl font-bold text-primary mt-2">6:1</h3>
            <p className="text-sm text-secondary-foreground mt-1">Regional Average 6:1</p>
          </div>
          <Clock className="h-5 w-5 text-primary-accent" />
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-secondary-foreground">Medial Posting Duration</p>
            <h3 className="text-2xl font-bold text-primary mt-2">27 Days</h3>
            <p className="text-sm text-secondary-foreground mt-1">Regional Average: 29</p>
          </div>
          <Calendar className="h-5 w-5 text-primary-accent" />
        </div>
      </Card>
    </div>
  );
};