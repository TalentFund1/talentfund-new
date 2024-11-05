import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

export const SelectBenchmark = () => {
  return (
    <Card className="p-6 space-y-6 bg-white mb-6">
      <h2 className="text-lg font-semibold text-foreground">Skill Benchmark</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Custom Benchmark</label>
            <Select defaultValue="nationwide">
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select benchmark" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nationwide">Nationwide / All Companies (default)</SelectItem>
                <SelectItem value="core">Core Competitors</SelectItem>
                <SelectItem value="finance">Finance/Banking</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="retail">Large Retailers</SelectItem>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="custom">Custom Benchmark</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Locations</label>
            <Input placeholder="Add a Location" className="bg-white" />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Companies</label>
            <Input placeholder="Add a Company" className="bg-white" />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Industries</label>
            <Input placeholder="Add a Industry" className="bg-white" />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Clear All</Button>
            <Button variant="outline">Save To Role</Button>
            <Button variant="outline" className="gap-2 bg-white">
              <PlayCircle className="h-4 w-4" />
              Run
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};