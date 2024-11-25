import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { duplicateProfileData } from './utils/profileDuplication';
import { jobTitles } from './competency/skillProfileData';

export const ProfileDuplicationWidget = () => {
  const [sourceId, setSourceId] = useState('');
  const [newProfileId, setNewProfileId] = useState('');
  const { toast } = useToast();

  const handleDuplication = () => {
    console.log('Starting profile duplication process');
    
    if (!sourceId || !newProfileId) {
      toast({
        title: "Validation Error",
        description: "Please select a source profile and provide a new profile ID",
        variant: "destructive",
      });
      return;
    }

    try {
      const success = duplicateProfileData(sourceId, newProfileId);
      
      if (success) {
        toast({
          title: "Profile Duplicated",
          description: "All functionalities have been successfully duplicated to the new profile",
        });
        console.log('Profile duplication completed successfully');
      }
    } catch (error) {
      console.error('Error during profile duplication:', error);
      toast({
        title: "Duplication Failed",
        description: "An error occurred while duplicating the profile",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold">Duplicate Profile</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Source Profile</label>
          <Select value={sourceId} onValueChange={setSourceId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select source profile" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(jobTitles).map(([id, title]) => (
                <SelectItem key={id} value={id}>
                  {title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">New Profile ID</label>
          <Input
            type="text"
            placeholder="Enter new profile ID"
            value={newProfileId}
            onChange={(e) => setNewProfileId(e.target.value)}
          />
        </div>

        <Button 
          onClick={handleDuplication}
          className="w-full"
        >
          Duplicate Profile
        </Button>
      </div>
    </Card>
  );
};