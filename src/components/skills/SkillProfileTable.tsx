import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const SkillProfileTable = () => {
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  
  const profiles = [
    {
      id: "1",
      name: "AI Engineer",
      function: "Engineering",
      skillCount: 16,
      employees: 2,
      profileMatches: 0,
      lastUpdated: "10/20/24"
    },
    {
      id: "2",
      name: "Backend Engineer",
      function: "Engineering",
      skillCount: 12,
      employees: 3,
      profileMatches: 4,
      lastUpdated: "10/20/24"
    },
    {
      id: "3",
      name: "Frontend Engineer",
      function: "Engineering",
      skillCount: 17,
      employees: 0,
      profileMatches: 5,
      lastUpdated: "10/20/24"
    },
    {
      id: "4",
      name: "Engineering Manager",
      function: "Engineering",
      skillCount: 11,
      employees: 2,
      profileMatches: 5,
      lastUpdated: "10/20/24"
    }
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProfiles(profiles.map(profile => profile.id));
    } else {
      setSelectedProfiles([]);
    }
  };

  const handleSelectProfile = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedProfiles([...selectedProfiles, id]);
    } else {
      setSelectedProfiles(selectedProfiles.filter(profileId => profileId !== id));
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-y border-border">
          <TableHead className="w-[5%]">
            <input 
              type="checkbox" 
              className="rounded border-gray-300"
              checked={selectedProfiles.length === profiles.length}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
          </TableHead>
          <TableHead className="w-[22%]">
            <div className="flex items-center gap-1">
              Role Name <ChevronDown className="h-4 w-4" />
            </div>
          </TableHead>
          <TableHead className="w-[18%]">Function</TableHead>
          <TableHead className="w-[15%] text-center">Skill Count</TableHead>
          <TableHead className="w-[15%] text-center">Employees</TableHead>
          <TableHead className="w-[15%] text-center">Profile Matches</TableHead>
          <TableHead className="w-[10%] text-right whitespace-nowrap">Last Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {profiles.map((profile) => (
          <TableRow key={profile.id} className="hover:bg-muted/50 transition-colors border-b border-border">
            <TableCell className="align-middle">
              <input 
                type="checkbox" 
                className="rounded border-gray-300"
                checked={selectedProfiles.includes(profile.id)}
                onChange={(e) => handleSelectProfile(profile.id, e.target.checked)}
              />
            </TableCell>
            <TableCell className="align-middle font-medium">
              <Link to="/skills/ai-engineer" className="text-primary hover:underline">
                {profile.name}
              </Link>
            </TableCell>
            <TableCell className="align-middle">{profile.function}</TableCell>
            <TableCell className="text-center align-middle">{profile.skillCount}</TableCell>
            <TableCell className="text-center align-middle">{profile.employees}</TableCell>
            <TableCell className="text-center align-middle">{profile.profileMatches}</TableCell>
            <TableCell className="text-right align-middle text-muted-foreground">{profile.lastUpdated}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};