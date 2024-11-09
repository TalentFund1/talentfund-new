import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export const SkillProfileTable = () => {
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);

  const profiles = [
    { name: "AI Engineer", function: "Engineering", skillCount: 16, employees: 2, matches: 0, lastUpdated: "10/20/24" },
    { name: "Backend Engineer", function: "Engineering", skillCount: 12, employees: 3, matches: 4, lastUpdated: "10/20/24" },
    { name: "Frontend Engineer", function: "Engineering", skillCount: 17, employees: 0, matches: 5, lastUpdated: "10/20/24" },
    { name: "Engineering Manager", function: "Engineering", skillCount: 11, employees: 2, matches: 5, lastUpdated: "10/20/24" }
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProfiles(profiles.map(profile => profile.name));
    } else {
      setSelectedProfiles([]);
    }
  };

  const handleSelectProfile = (checked: boolean, profileName: string) => {
    if (checked) {
      setSelectedProfiles(prev => [...prev, profileName]);
    } else {
      setSelectedProfiles(prev => prev.filter(name => name !== profileName));
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-b border-border">
          <TableHead className="w-[5%] h-12">
            <Checkbox 
              checked={selectedProfiles.length === profiles.length}
              onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
              className="rounded border-gray-300"
            />
          </TableHead>
          <TableHead className="w-[22%] h-12">
            <div className="flex items-center gap-1">
              Role Name <ChevronDown className="h-4 w-4" />
            </div>
          </TableHead>
          <TableHead className="w-[18%] h-12">Function</TableHead>
          <TableHead className="w-[15%] text-center h-12">Skill Count</TableHead>
          <TableHead className="w-[15%] text-center h-12">Employees</TableHead>
          <TableHead className="w-[15%] text-center h-12">Profile Matches</TableHead>
          <TableHead className="w-[10%] text-right whitespace-nowrap h-12">Last Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {profiles.map((profile) => (
          <TableRow key={profile.name} className="h-16 hover:bg-muted/50 transition-colors border-b border-border">
            <TableCell className="align-middle">
              <Checkbox 
                checked={selectedProfiles.includes(profile.name)}
                onCheckedChange={(checked) => handleSelectProfile(checked as boolean, profile.name)}
                className="rounded border-gray-300"
              />
            </TableCell>
            <TableCell className="align-middle font-medium">
              <Link to={`/skills/${profile.name.toLowerCase().replace(' ', '-')}`} className="text-primary hover:underline">
                {profile.name}
              </Link>
            </TableCell>
            <TableCell className="align-middle">{profile.function}</TableCell>
            <TableCell className="text-center align-middle">{profile.skillCount}</TableCell>
            <TableCell className="text-center align-middle">{profile.employees}</TableCell>
            <TableCell className="text-center align-middle">{profile.matches}</TableCell>
            <TableCell className="text-right align-middle text-muted-foreground">{profile.lastUpdated}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};