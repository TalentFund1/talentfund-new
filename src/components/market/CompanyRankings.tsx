import { Card } from "@/components/ui/card";

interface Company {
  name: string;
  profiles: number;
}

interface CompanyRankingsProps {
  title: string;
  companies: Company[];
  maxProfiles: number;
}

export const CompanyRankings = ({ title, companies, maxProfiles }: CompanyRankingsProps) => {
  return (
    <Card className="p-6 h-full">
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-sm font-medium text-primary">{title}</h4>
          <h4 className="text-sm font-medium text-primary">Profiles</h4>
        </div>
        <div className="space-y-4">
          {companies.map((company, index) => (
            <div key={index} className="flex justify-between items-center group hover:bg-muted/50 p-2 rounded-md transition-colors">
              <span className="text-sm text-secondary-foreground group-hover:text-primary transition-colors">{company.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-secondary-foreground group-hover:text-primary transition-colors">
                  {company.profiles.toLocaleString()}
                </span>
                <div 
                  className="h-2 bg-primary-accent rounded transition-all group-hover:bg-primary-accent/80" 
                  style={{ 
                    width: `${(company.profiles / maxProfiles) * 100}px`,
                    minWidth: '20px'
                  }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};