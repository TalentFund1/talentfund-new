import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { createNewProfile, validateProfileData } from "@/utils/profileDuplication";
import { roleSkills } from "../skills/data/roleSkills";

export const ProfileDuplicationWidget = () => {
  const [newProfileId, setNewProfileId] = useState("");
  const [newProfileName, setNewProfileName] = useState("");
  const [sourceProfileId, setSourceProfileId] = useState("");
  const { toast } = useToast();

  const handleCreateProfile = () => {
    if (!newProfileId || !newProfileName) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const success = createNewProfile(
      {
        id: newProfileId,
        name: newProfileName,
        specialized: [],
        common: [],
        certifications: []
      },
      sourceProfileId
    );

    if (success) {
      toast({
        title: "Success",
        description: "Profile created successfully",
      });

      // Validate the new profile
      const isValid = validateProfileData(newProfileId);
      if (!isValid) {
        toast({
          title: "Warning",
          description: "Profile created but some data might be missing",
          variant: "destructive",
        });
      }

      // Reset form
      setNewProfileId("");
      setNewProfileName("");
      setSourceProfileId("");
    } else {
      toast({
        title: "Error",
        description: "Failed to create profile",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold">Create New Profile</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Profile ID</label>
          <Input
            value={newProfileId}
            onChange={(e) => setNewProfileId(e.target.value)}
            placeholder="Enter profile ID"
            className="mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Profile Name</label>
          <Input
            value={newProfileName}
            onChange={(e) => setNewProfileName(e.target.value)}
            placeholder="Enter profile name"
            className="mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Duplicate From (Optional)</label>
          <Select value={sourceProfileId} onValueChange={setSourceProfileId}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select source profile" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">None (Create Empty)</SelectItem>
              {Object.keys(roleSkills).map((id) => (
                <SelectItem key={id} value={id}>
                  {roleSkills[id].name || `Profile ${id}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleCreateProfile} className="w-full">
          Create Profile
        </Button>
      </div>
    </Card>
  );
};