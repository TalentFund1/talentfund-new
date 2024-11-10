import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IndependentSkillProfileTable } from "./IndependentSkillProfileTable";
import { useToast } from "@/components/ui/use-toast";

export const IndependentSkillProfile = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("benchmark");
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: "Your skill profile has been updated successfully.",
    });
  };

  const handleCancel = () => {
    toast({
      title: "Changes discarded",
      description: "Your changes have been discarded.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Skill Profile</h2>
        <div className="space-x-2">
          <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="web">Web Development</SelectItem>
            <SelectItem value="ai">AI & Machine Learning</SelectItem>
            <SelectItem value="cloud">Cloud Computing</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Skill Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Skill Types</SelectItem>
            <SelectItem value="technical">Technical Skills</SelectItem>
            <SelectItem value="soft">Soft Skills</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort by Benchmark" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="benchmark">Sort by Benchmark</SelectItem>
            <SelectItem value="growth">Sort by Growth</SelectItem>
            <SelectItem value="salary">Sort by Salary</SelectItem>
          </SelectContent>
        </Select>

        <div className="ml-auto">
          <Button>Add Skill</Button>
        </div>
      </div>

      <IndependentSkillProfileTable />
    </div>
  );
};