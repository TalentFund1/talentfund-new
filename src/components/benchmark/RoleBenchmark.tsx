import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BenchmarkAnalysis } from "./BenchmarkAnalysis";
import { BenchmarkComparison } from "./BenchmarkComparison";
import { BenchmarkHeader } from "./BenchmarkHeader";
import { BenchmarkLevels } from "./BenchmarkLevels";
import { BenchmarkRoles } from "./BenchmarkRoles";
import { create } from "zustand";

interface RoleStore {
  selectedRole: string;
  selectedLevel: string;
  setSelectedRole: (role: string) => void;
  setSelectedLevel: (level: string) => void;
}

export const useRoleStore = create<RoleStore>((set) => ({
  selectedRole: "AI Engineer",
  selectedLevel: "P4",
  setSelectedRole: (role) => set({ selectedRole: role }),
  setSelectedLevel: (level) => set({ selectedLevel: level }),
}));

export const RoleBenchmark = () => {
  const { id: employeeId } = useParams();
  const [showComparison, setShowComparison] = useState(false);
  const { selectedRole, selectedLevel, setSelectedRole, setSelectedLevel } = useRoleStore();

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
  };

  return (
    <div className="space-y-6">
      <BenchmarkHeader 
        showComparison={showComparison}
        onToggleComparison={() => setShowComparison(!showComparison)}
      />

      <div className="grid grid-cols-3 gap-4">
        <Card className="col-span-2 p-6">
          <h3 className="text-lg font-semibold mb-4">Select Role</h3>
          <BenchmarkRoles 
            selectedRole={selectedRole}
            onRoleSelect={handleRoleSelect}
          />
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Select Level</h3>
          <BenchmarkLevels 
            selectedLevel={selectedLevel}
            onLevelSelect={handleLevelSelect}
          />
        </Card>
      </div>

      <Separator />

      <BenchmarkAnalysis />

      {showComparison && (
        <>
          <Separator />
          <BenchmarkComparison />
        </>
      )}
    </div>
  );
};