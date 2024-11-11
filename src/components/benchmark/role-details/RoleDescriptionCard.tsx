import { Card } from "@/components/ui/card";

interface RoleDescriptionCardProps {
  role: {
    title: string;
    level: string;
  };
  descriptions: Record<string, string>;
  levelDescriptions: Record<string, string>;
}

export const RoleDescriptionCard = ({ role, descriptions, levelDescriptions }: RoleDescriptionCardProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{role.title}: {role.level}</h3>
      <p className="text-muted-foreground mb-4">
        {descriptions[role.title as keyof typeof descriptions]}
      </p>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Level Description</h4>
          <p className="text-muted-foreground">
            {levelDescriptions[role.level as keyof typeof levelDescriptions]}
          </p>
        </div>
      </div>
    </Card>
  );
};