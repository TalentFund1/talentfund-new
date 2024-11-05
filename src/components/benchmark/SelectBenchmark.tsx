import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SelectBenchmark = () => {
  return (
    <Card className="p-6 space-y-6 bg-white mb-6">
      <h2 className="text-lg font-semibold text-foreground">1. Select Benchmark</h2>
      
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
            <Button>Save To Role</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};