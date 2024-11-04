import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SkillsTableSection } from "./SkillsTableSection";

export const SkillProfileMatrix = () => {
  return (
    <Card className="p-6 space-y-6 animate-fade-in">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-foreground">Set Custom Benchmark</h2>
          <div className="space-x-2">
            <Button variant="outline" className="bg-white">Cancel</Button>
            <Button>Save</Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              Location
            </label>
            <Input 
              className="bg-white" 
              placeholder="Enter location..." 
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                Companies
              </label>
              <Button variant="ghost" className="text-sm h-auto py-1 px-2 hover:bg-background">Clear</Button>
            </div>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                Netflix
                <X className="h-3 w-3 cursor-pointer hover:text-primary-accent" />
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                Disney
                <X className="h-3 w-3 cursor-pointer hover:text-primary-accent" />
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        <SkillsTableSection />
      </div>
    </Card>
  );
};