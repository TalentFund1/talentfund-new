import { Card } from "@/components/ui/card";
import { CompensationTable } from "./CompensationTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export const PayBands = () => {
  const [track, setTrack] = useState("Professional");

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-primary">Pay Bands</h3>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-muted-foreground">Track:</span>
          <Select value={track} onValueChange={setTrack}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Professional">Professional</SelectItem>
              <SelectItem value="Managerial">Managerial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <CompensationTable track={track} />
      </div>
    </Card>
  );
};