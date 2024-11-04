import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, X } from "lucide-react";
import { SkillsTableSection } from "./SkillsTableSection";

export const SkillProfileMatrix = () => {
  return (
    <Card className="p-6 space-y-6 animate-fade-in">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input type="search" placeholder="Search Skills..." className="bg-white" />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white gap-1">
              <MapPin className="h-3 w-3" /> Remote
              <X className="h-3 w-3 cursor-pointer" />
            </Badge>
            <Badge variant="outline" className="bg-white gap-1">
              <Building2 className="h-3 w-3" /> Hybrid
              <X className="h-3 w-3 cursor-pointer" />
            </Badge>
          </div>
        </div>

        <SkillsTableSection />
      </div>
    </Card>
  );
};