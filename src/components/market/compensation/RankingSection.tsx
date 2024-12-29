import { Card } from "@/components/ui/card";

interface RankingItem {
  name: string;
  profiles: number;
}

interface RankingSectionProps {
  title: string;
  items: RankingItem[];
  maxProfiles: number;
}

export const RankingSection = ({ title, items, maxProfiles }: RankingSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-primary">{title}</h4>
        <h4 className="text-sm font-medium text-primary">Profiles</h4>
      </div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm text-secondary-foreground">{item.name}</span>
            <div className="flex items-center gap-3">
              <span className="text-sm text-secondary-foreground">{item.profiles.toLocaleString()}</span>
              <div 
                className="h-2 bg-primary-accent rounded" 
                style={{ 
                  width: `${(item.profiles / maxProfiles) * 100}px`
                }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};